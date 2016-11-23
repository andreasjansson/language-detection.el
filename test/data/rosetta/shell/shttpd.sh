#!/bin/sh
#
# /*!
#     @header
#
# This script is a mostly functional HTTP/1.1 web server written using
# shell scripts.  The main purpose of this script, however, is to
# provide a practical example of several techniques:
#
# <ul>
#    <li> Finding the exact path of the script and sourcing subroutines from
#         files in locations relative to the script directory.</li>
#
#    <li> Using the nc (netcat) utility for script-based networking.</li>
#    <li> Using circular pipes.</li>
#    <li> Using complex data structures (in binary_tree.sh)</li>
#    <li> Parsing text (in parsers.sh)</li>
# </ul>
#  */

SHTTPD_VERSION="1.0"

INFIFO="/tmp/infifo.$$"
OUTFIFO="/tmp/outfifo.$$"

SCRIPT="$(which $0)"
SCRIPTDIR="$(dirname "$SCRIPT")"

DISABLE_TESTS=true
. "$SCRIPTDIR"/shttpd.conf # Load this FIRST
. "$SCRIPTDIR"/shttpd_subs/binary_tree.sh
. "$SCRIPTDIR"/shttpd_subs/parsers.sh
. "$SCRIPTDIR"/shttpd_subs/handlers.sh
. "$SCRIPTDIR"/shttpd_subs/cgi.sh

mkfifo "$INFIFO"
mkfifo "$OUTFIFO"


# /*! @abstract Tears down the web server and cleans up temporary files. */
cleanup_shttpd()
{
	rm $INFIFO
	rm $OUTFIFO

	if [ "$NCPID" != "" ] ; then
		kill -TERM $NCPID
	fi

	exit
}

# /*! @abstract Attempts to reconnect after a sigpipe. */
reconnect()
{
	PSOUT="$(ps -p $NCPID | tail -n +2 | tr -d '\n')"
	if [ "$PSOUT" = "" ] ; then
		cleanup_shttpd
	fi
	closeConnection 8 "$INFIFO"
}

# /*! @abstract Works around a curious bug in which the very first connection fails. */
testMyself()
{
	sleep 1

	PORT="$(echo "$DEFAULTDOMAIN" | sed 's/.*://')"

	curl "http://127.0.0.1:$PORT/" 2> /dev/null > /dev/null
}

trap cleanup_shttpd SIGHUP
trap cleanup_shttpd SIGTERM
trap reconnect SIGPIPE
trap cleanup_shttpd SIGABRT
trap cleanup_shttpd SIGTSTP
trap cleanup_shttpd SIGCHLD
trap cleanup_shttpd SIGSEGV
trap cleanup_shttpd SIGBUS
trap cleanup_shttpd SIGQUIT
trap cleanup_shttpd SIGINT

$NC -l -k $SHTTPD_PORTS < $INFIFO > $OUTFIFO &
NCPID=$!

testMyself &

exec 8> $INFIFO
exec 9<> $OUTFIFO

newTree "RESPONSEHEADERTREE"
RESPONSEHEADERTREE="$(getLastNodeName)"

while true ; do
	read -u9 REQUEST
	REQUEST="$(echo "$REQUEST" | tr -d '\r' | tr -d '\n')"

	# Apache does this.  It probably isn't necessary to handle
	# extra NL/CR pairs before the request, but it can't hurt
	while [ "$REQUEST" = "" ] ; do
		read -u9 REQUEST
		REQUEST="$(echo "$REQUEST" | tr -d '\r' | tr -d '\n')"
	done

	parseHeaders 9

	handleRequest 8 9 "$REQUEST" "$HEADERTREE" "$RESPONSEHEADERTREE"

	closeConnection 8 "$INFIFO"
done

cleanup_shttpd

