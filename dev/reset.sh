# This script is intended to be run from the root via `npm run reset`
rm database/contacts.sqlite3
sqlite3 database/contacts.sqlite3 < database/schema.sql
sqlite3 database/contacts.sqlite3 < dev/test-data.sql