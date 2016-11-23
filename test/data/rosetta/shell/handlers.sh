
# /*!
#     @header
#         Request handlers, string routines, and core I/O.
#  */

# /*!
#     @group I/O Functions
#  */

# /*!
#     @abstract
#         Prints a string with a terminating newline.
#  */
print()
{
	printf "%s" "$1"
}

# /*!
#     @abstract
#         Obtains the length of a string.
#  */
strlen()
{
	printf "%s" "$1" | wc -c | sed 's/[^0-9]//g'
}

# /*!
#     @abstract
#         Converts a string to uppercase.
#  */
toupper()
{
	printf "%s" "$1" | tr '[:lower:]' '[:upper:]'
}

# /*!
#     @abstract
#         Converts a string to lowercase.
#  */
tolower()
{
	printf "%s" "$1" | tr '[:upper:]' '[:lower:]'
}

# /*!
#     @abstract
#         Splits the query string from a URL.
#     @discussion
#         Stores the results in two global variables:
#
#         {@link //apple_ref/shell/var/PATHPART PATHPART} contains the script path.
#
#         {@link //apple_ref/shell/var/PARMPART PARMPART} contains the query string.
#  */
splitURL()
{
	URL="$1"
	PATHPART="$(echo "$URL" | sed 's/?.*$//g')"
	local PATHLEN="$(strlen "$PATHPART")";
	local CUTPOS="$(expr "$PATHLEN" "+" "2")"

	PARMPART="$(echo "$URL" | cut -c "$CUTPOS-")"
}

# /*!
#     @abstract
#         Searches for a CGI script within a relative path.
#     @discussion
#         This searches for a CGI script when it is passed in the middle
#         of a URL.  For example, "http://example.org/script.cgi/foo/bar".
#     @result
#         If it finds a script, the first part of the path (up to and including
#         the script name) is stored in the global variable
#         {@link //apple_ref/shell/var/SCRIPT_PATH SCRIPT_PATH} and the
#         rest of the path after the script name is stored into the global
#         variable {@link //apple_ref/shell/var/SCRIPT_REMAINDER SCRIPT_REMAINDER}.
#
#         If it fails to find a script in the path,
#     @param RELATIVEPATH
#         The path relative to the document root.
#     @param BASEDIR
#         The document root.
#  */
splitForScript()
{
	RELATIVEPATH="$1"
	BASEDIR="$2"

	SCRIPT_PATH="$RELATIVEPATH"
	SCRIPT_REMAINDER=""

	while [ "$SCRIPT_PATH" != "/" -a "$SCRIPT_PATH" != "" ] ; do
		if [ "$(echo "$SCRIPT_PATH" | grep '\/$' )" != "" ] ; then
			SCRIPT_PATH="$(echo "$SCRIPT_PATH" | sed 's/\/$//')"
			SCRIPT_REMAINDER="//$SCRIPT_REMAINDER"
		else
			SCRIPT_REMAINDER="$(basename $SCRIPT_PATH)/$SCRIPT_REMAINDER"
			SCRIPT_PATH="$(dirname $SCRIPT_PATH)"
		fi

		if [ -f "$BASEDIR$SCRIPT_PATH" ] ; then
			cgiMatch "$BASEDIR$SCRIPT_PATH"
			if [ $? != $SPAWNTYPE_NONE ] ; then
				SCRIPT_REMAINDER="$(echo $SCRIPT_REMAINDER | sed 's/\/$//')"
				# echo "SR: $SCRIPT_REMAINDER"

				return;
			fi
		fi
	done

	SCRIPT_PATH=""
	SCRIPT_REMAINDER=""
}

# /*!
#     @abstract
#         Handles an HTTP request.
#     @param FD
#         The file descriptor for sending data to {@link //apple_ref/doc/man/1/nc nc}.
#     @param READFD
#         The file descriptor for receiving data from {@link //apple_ref/doc/man/1/nc nc}.
#     @param REQUEST
#         The request line received from the client.
#     @param HEADERTREE
#         A binary tree of headers received from the client.
#     @param RESPONSEHEADERTREE
#         A binary tree of headers to send back to the client.
#  */
handleRequest()
{
	local FD="$1"
	local READFD="$2"
	local REQUEST="$3"
	local HEADERTREE="$4"
	local RESPONSEHEADERTREE="$5"

	# Used by parseRequest
	local TYPE
	local URL
	local VERSION

        parseRequest "$REQUEST"

	if [ "$VERSION" != "HTTP/1.0" -a "$VERSION" != "HTTP/1.1" -a "$VERSION" != "" ] ; then
		STATUS="505"

		echo "Unsupported HTTP version \"$VERSION\"" 1>&2
		handleError "$FD" "$URL"
		return
	fi

	if [ "$TYPE" = "GET" ] ; then
		handleGetPostRequest "$FD" "$READFD" "$URL" "$VERSION" "$HEADERTREE" "$RESPONSEHEADERTREE" "GET"
	elif [ "TYPE" = "POST" ] ; then
		handleGetPostRequest "$FD" "$READFD" "$URL" "$VERSION" "$HEADERTREE" "$RESPONSEHEADERTREE" "POST"
	else
		STATUS="405"

		handleError "$FD" "$URL" "$VERSION"
		return
	fi
}

# /*!
#     @abstract
#         Handles an HTTP GET or POST request.
#     @discussion
#         This function is callsed by {@link handleRequest}.
#     @param FD
#         The file descriptor for sending data to {@link //apple_ref/doc/man/1/nc nc}.
#     @param READFD
#         The file descriptor for receiving data from {@link //apple_ref/doc/man/1/nc nc}.
#     @param URL
#         The original URL as received from the client.
#     @param HTTP_VERSION
#         The HTTP version specified ("HTTP/1.0" or "HTTP/1.1").
#     @param HEADERTREE
#         A binary tree of headers received from the client.
#     @param RESPONSEHEADERTREE
#         A binary tree of headers to send back to the client.
#     @param METHOD
#         The request method (GET or POST) used.
#  */
handleGetPostRequest()
{
	local FD="$1"
	local READFD="$2"
	local URL="$3"
	local HTTP_VERSION="$4"
	local HEADERTREE="$5"
	local RESPONSEHEADERTREE="$6"
	local METHOD="$7"

	local HOST
	local PATHPART
	local PARMPART

	if [ "$HTTP_VERSION" = "HTTP/1.0" -o "$HTTP_VERSION" = "" ] ; then
		HOST="$DEFAULTDOMAIN"
	else
		local HOSTKEY="$(treeSearch "$HEADERTREE" "Host")"
		HOST="$(tolower "$(treeField "$HOSTKEY" "Contents")")"
		echo "HOST: \"$HOST\"" 1>&2
		if [ "$HOST" = "" ] ; then
			STATUS=400
			handleError "$FD" "$URL"
			return
		fi
	fi

	if [ "$(echo "$HOST" | grep ':')" = "" ] ; then
		HOST="$HOST:80"
	fi

	# sendData "$FD" "Tree Dump: $(printTree "$HEADERTREE")"

	if [ "$REALPATH" = "" ] ; then
		STATUS="500"
		handleError "$FD" "$URL"
		return
	fi

	splitURL "$URL"

	# echo "PATHPART: $PATHPART" 1>&2
	# echo "PARMPART: $PARMPART" 1>&2

	# Get the absolute URL for the relative path.
	LOCALFILE="./sites/$HOST$PATHPART"

	# ORIGLOCALFILE="$LOCALFILE"

	ISDIR=0
	if [ -d "$LOCALFILE" ] ; then

		NEWPATHPART="$(echo "$PATHPART" | sed 's/\/$//')"

		REDIRECTTO=""

		# echo "Directory.  Looking for index.html" 1>&2
		for i in index.html index.htm index.shtml index.shtm index.php index.pl ; do
			if [ -f "$LOCALFILE/$i" ] ; then
				REDIRECTTO="$i"
				break;
			fi
		done

		if [ "$REDIRECTTO" != "" ] ; then
			echo "Redirect needed to $NEWPATHPART/$REDIRECTTO" 1>&2
			NEWURL="$NEWPATHPART/$REDIRECTTO"

			if [ "$PARMPART" != "" ] ; then
				NEWURL="$NEWURL""?""$PARMPART"
			fi
			handleRedirect "$FD" "$NEWURL" "$HOST" "$HEADERTREE" "$RESPONSEHEADERTREE"
			return
		fi

		if [ "$(echo "$PATHPART" | grep '\/$')" = "" ] ; then
			echo "Redirect needed to $PATHPART/" 1>&2
			handleRedirect "$FD" "$PATHPART/" "$HOST" "$HEADERTREE" "$RESPONSEHEADERTREE"
			return;
		fi
		ISDIR=1
	fi

	ABSFILE="$($REALPATH "$LOCALFILE" 2>/dev/null)"
	FORCE_CGI=0
	if [ "$(echo "$LOCALFILE" | grep '\/$' )" != "" ] ; then
		if [ "$ABSFILE" != "" -a ! -d "$ABSFILE" ] ; then
			FORCE_CGI=1
		fi
	fi

	cgiMatch "$LOCALFILE"
	if [ $? != $SPAWNTYPE_NONE ] ; then
		SCRIPT_PATH="$PATHPART"
		SCRIPT_REMAINDER=""
	else
		SCRIPT_PATH=""
		SCRIPT_REMAINDER=""
	fi

	# echo "ABSFILE: $ABSFILE" 1>&2
	if [ "$ABSFILE" = "" -o "$FORCE_CGI" = 1 ] ; then
		splitForScript "$PATHPART" "./sites/$HOST"
		if [ "$SCRIPT_PATH" = "" ] ; then
			# echo "S4S Failed for host $HOST" 1>&2
			STATUS="404"
			handleError "$FD" "$URL"
			return
		else
			LOCALFILE="./sites/$HOST$SCRIPT_PATH"
			ABSFILE="$($REALPATH "$LOCALFILE" 2>/dev/null)"

			# echo "SCRIPT_PATH: $SCRIPT_PATH" 1>&2
			# echo "SCRIPT_REMAINDER: $SCRIPT_REMAINDER" 1>&2
		fi
	fi

	# echo "SCRIPT_PATH: $SCRIPT_PATH" 1>&2
	# echo "SCRIPT_REMAINDER: $SCRIPT_REMAINDER" 1>&2

	# Get the base path for this URL and make sure the new URL
	# didn't do ".." too many times in an attempt to break out of the
	# server root.
	BASE="$($REALPATH "./sites/$HOST/")"
	BASELEN="$(strlen "$BASE")" # printf "%s" "$BASE" | wc -c | sed 's/[^0-9]//g')"

	if [ "$BASE" = "" ] ; then
		STATUS="500"
		echo "All your BASE are belong to NULL (HOST IS $HOST)" 1>&2
		handleError "$FD" "$URL"
		return
	fi

	# echo "BASELEN: $BASELEN" 1>&2

	# echo "$ABSFILE | cut -c \"1-$BASELEN\"" 1>&2
	FIRSTPART="$(echo $ABSFILE | cut -c "1-$BASELEN")"

	# echo "LOCALFILE: \"$LOCALFILE\" ABSFILE: \"$ABSFILE\" FIRSTPART: \"$FIRSTPART\" BASE: \"$BASE\"" 1>&2

	if [ "$FIRSTPART" != "$BASE" ] ; then
		echo "Illegal URL $URL" 1>&2
		echo "403 LOCALFILE: \"$LOCALFILE\" ABSFILE: \"$ABSFILE\" FIRSTPART: \"$FIRSTPART\" BASE: \"$BASE\"" 1>&2
		STATUS="403"
		handleError "$FD" "$URL"
		return
	fi

	# $URL $VERSION

	# echo "ID: $ISDIR"

	if [ "$ISDIR" = "1" ] ; then
		# echo "NOT FOUND: $LOCALFILE/index.html"
		handleDirListing "$FD" "$URL" "$LOCALFILE"
		return
	fi

	# echo "ORIGLOCALFILE: $ORIGLOCALFILE"
	# echo "LOCALFILE: $LOCALFILE"

	if [ "$SCRIPT_PATH" = "" ] ; then
		sendFile "$FD" "$LOCALFILE" "$URL"
	else
		spawn_cgi "$FD" "$READFD" "$BASE" "$SCRIPT_PATH" "$SCRIPT_REMAINDER" "$PARMPART" "$HOST" "$METHOD" "$HEADERTREE" 
	fi
}

# /*!
#     @abstract
#         Sends an HTTP redirect.
#     @discussion
#         This function is callsed by {@link handleRequest}.
#     @param FD
#         The file descriptor for sending data to {@link //apple_ref/doc/man/1/nc nc}.
#     @param URL
#         The original URL as received from the client.
#     @param HOST
#         The hostname:port pair that the client requested.
#     @param HEADERTREE
#         A binary tree of headers received from the client.
#     @param RESPONSEHEADERTREE
#         A binary tree of headers to send back to the client.
#  */
handleRedirect()
{
	FD="$1"
	URL="$2"
	HOST="$3"
	HEADERTREE="$4"
	RESPONSEHEADERTREE="$5"

	STATUS="301"
	addHeader "Location" "http://$HOST$URL" "$RESPONSEHEADERTREE"

	# In spite of what the spec says, most browsers close the connection
	# immediately without waiting for explanation.  This hoses shttpd
	# with a standard nc because nc never tells it that the connection
	# closed, so shttpd sends the failure message to the next client
	# that connects.  Worse, when shttpd closes its connection to shttpd
	# to reset the connection, there's a race condition.  If the next
	# client has already connected, it gets disconnected without
	# receiving a single byte of data.
	if [ "$HAS_NEW_NETCAT" != 1 ] ; then
		# With an unpatched nc, the browser must be forced to always
		# close the connection as soon as it sees the newline after
		# the header so that all browsers will behave in the same
		# way and so that shttpd does not have to do a connection
		# reset.  To achieve this, we set the Conection header to
		# "close" and set Content-Length to 0.  This should work
		# even for browsers that actually try to read the content
		# after a 301.

		addHeader "Content-Length" "0" "$RESPONSEHEADERTREE"

		sendStatus "$FD"
		sendHeaders "$FD"

		DISABLE_RESET=1
	else
		# With a patched version of netcat that always waits for
		# the client to close its socket before continuing,
		# this is not a problem.

		addHeader "Content-Type" "text/html" "$RESPONSEHEADERTREE"

		# printTree "$HEADERTREE"
		# printTree "$RESPONSEHEADERTREE"

		DATA="<html><head><title>Document moved.</title></head>"
		DATA="$DATA""<body><H1>Document Moved Permanently</H1>"
		DATA="$DATA""<p>This document has moved.  If your browser does not redirect you,"
		DATA="$DATA""click <a href=\"$URL\">here</a>.</p>"
		DATA="$DATA""</body></html>"
		DATALEN="$(strlen "$DATA")"

		addHeader "Content-Length" "$DATALEN" "$RESPONSEHEADERTREE"

		sendData "$FD" "$DATA"
	fi

	return;
}

# /*!
#     @abstract
#         Prints a directory listing.
#     @discussion
#         This function is callsed by {@link handleGetPostRequest}.  Before calling
#         this function, be certain that the directory request is safe.  This function
#         does no validation whatsoever.
#     @param FD
#         The file descriptor for sending data to {@link //apple_ref/doc/man/1/nc nc}.
#     @param URL
#         The original URL as received from the client.
#     @param LOCALDIR
#         The complete local path to the requested directory.
#  */
handleDirListing()
{
	FD="$1"
	URL="$2"
	LOCALDIR="$3"

	STATUS="200"

	sendData "$FD" "<html><head><title>Directory listing for $URL</title></head><body>"
	sendData "$FD" "<H1>Directory listing for $URL</H1>"
	if [ "$URL" != "" -a "$URL" != "/" ] ; then
		sendData "$FD" "<p><a href=\"../\">Parent Directory/</a></p>"
	fi
	sendData "$FD" "<ul>"

	# echo "DIR LISTING FOR \"$LOCALDIR\"" 1>&2
	for i in "$LOCALDIR"/* ; do
		# echo "FILE IS \"$i\"" 1>&2
		FILENAME="$(basename "$i")"
		if [ -d "$i" ] ; then
			sendData "$FD" "<li><a href=\"$FILENAME/\">$FILENAME/</a></li>"
		elif [ -f "$i" ] ; then
			sendData "$FD" "<li><a href=\"$FILENAME\">$FILENAME</a></li>"
		fi
	done
	sendData "$FD" "</ul>"
	sendData "$FD" "</body></html>"
	return
}

# /*!
#     @abstract
#         Prints a status string for a status code number.
#     @result
#         Returns s status code string through <code>stderr</code> for
#         the HTTP status code in <cpde>CODE<code>.
#
#         This function is not a complete list of status codes.  It only includes
#         strings for result codes that shttpd.sh actually generates internally.
#     @param CODE
#         The HTTP status code number.
#  */
getStatusText()
{
	CODE=$1

	if [ $CODE = 200 ] ; then
		echo "OK"
	elif [ $CODE = 301 ] ; then
		echo "MOVED PERMANENTLY"
	elif [ $CODE = 400 ] ; then
		echo "BAD REQUEST"
	elif [ $CODE = 403 ] ; then
		echo "FORBIDDEN"
	elif [ $CODE = 404 ] ; then
		echo "NOT FOUND"
	elif [ $CODE = 405 ] ; then
		echo "METHOD NOT ALLOWED"
	elif [ $CODE = 501 ] ; then
		echo "NOT IMPLEMENTED"
	elif [ $CODE = 505 ] ; then
		echo "HTTP VERSION NOT SUPPORTED"
	else
		echo "UNKNOWN ERROR"
	fi
}

# /*!
#     @abstract
#         Sends an HTTP error page to the client.
#     @discussion
#         You must set the value of <code>STATUS</code> to the appropriate
#         HTTP error code before calling this function.
#     @param FD
#         The file descriptor for sending data to {@link //apple_ref/doc/man/1/nc nc}.
#     @param URL
#         The URL associated with the failed request.
#  */
handleError()
{
	FD="$1"
	URL="$2"

	sendStatus "$FD"
	sendHeaders "$FD"

	sendData "$FD" "<html><head></head><body><H1>$STATUS: $STATUSTEXT</H1><p>The browser sent a request the server could not understand.  If this problem persists and the URL you are following is valid, please contact the server administrator.</p><p><i>$URL</i></p></body></html>"
}

# /*!
#     @abstract
#         Instructs the netcat process to close the connection to the client.
#     @discussion
#         Do not close the connection if the Content-Length status is set.
#         Otherwise, you may end up closing the connection on the wrong client.
#     @param FD
#         The file descriptor for sending data to {@link //apple_ref/doc/man/1/nc nc}.
#     @param FIFO
#         The FIFO used for sending data to {@link //apple_ref/doc/man/1/nc nc}.
#  */
closeConnection()
{
	FD="$1"
	FIFO="$2"

	# Reset for the next connection.
	HEADERSSENT=""
	STATUSSENT=""

	deleteTree "$HEADERTREE"

	deleteTree "$RESPONSEHEADERTREE"
	newTree "RESPONSEHEADERTREE"
	RESPONSEHEADERTREE="$(getLastNodeName)"

	if [ "$DISABLE_RESET" = "1" ] ; then
		DISABLE_RESET=""
	else
		eval exec $FD\>\&\-
		sleep 1
		eval exec $FD\> \"$FIFO\"
	fi
}

