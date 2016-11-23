(import '(java.net ServerSocket Socket SocketException)
        '(java.io InputStreamReader OutputStreamWriter)
        '(clojure.lang LineNumberingPushbackReader))
 
(defn on-thread [f]
  (doto (new Thread f) (.start)))
 
(defn create-server 
  "creates and returns a server socket on port, will pass the client
  socket to accept-socket on connection" 
  [accept-socket port]
    (let [ss (new ServerSocket port)]
      (on-thread #(when-not (. ss (isClosed))
                    (try (accept-socket (. ss (accept)))
                         (catch SocketException e))
                    (recur)))
      ss))
 
(defn repl
  "runs a repl on ins and outs until eof"
  [ins outs]
    (binding [*ns* (create-ns 'user)
              *warn-on-reflection* false
              *out* (new OutputStreamWriter outs)]
      (let [eof (new Object)
            r (new LineNumberingPushbackReader (new InputStreamReader ins))]
        (loop [e (read r false eof)]
          (when-not (= e eof)
            (prn (eval e))
            (flush)
            (recur (read r false eof)))))))
 
(defn socket-repl 
  "starts a repl thread on the iostreams of supplied socket"
  [s] (on-thread #(repl (. s (getInputStream)) (. s (getOutputStream)))))
 
(def server (create-server socket-repl 13579))
(def client (new Socket "localhost" 13579))
 
(def rdr (new LineNumberingPushbackReader 
              (new InputStreamReader (. client (getInputStream)))))
(def wtr (new OutputStreamWriter (. client (getOutputStream))))
 
(binding [*out* wtr]
  (prn '(+ 1 2 3))
  (flush)
  (read rdr))
 
(. server (close))
(. client (close))
