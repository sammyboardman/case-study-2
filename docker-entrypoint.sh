if [ $# -eq 0 ]; then
  if [ -n "$DEBUG" ]; then
    node --inspect-brk=0.0.0.0 src/server.js
  elif [ -n "$WATCH" ]; then
    node_modules/.bin/nodemon --inspect=0.0.0.0 -L src/server.js
  else
    exec node src/server.js
  fi
else
  exec "$@"
fi

exit $?