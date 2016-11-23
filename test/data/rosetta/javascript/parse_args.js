  var requestArgs = parseArgs();

        /**
         * Parse the request arguments.
         */
        function parseArgs() {
          var args = {};
          var query = document.location.search.substring(1);
          var pairs = query.split('&');
          for (var i = 0; i < pairs.length; i++) {
            pos = pairs[i].indexOf('=');
            if (pos == -1) continue;
            var argname = pairs[i].substring(0, pos);
            var value = pairs[i].substring(pos+1);
            args[argname] = value;
          }
          return args;
        }