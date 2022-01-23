# Decisions

The implementation part of the program was pretty simple. However I found
testing a bit complicated in nature. I wanted to add e2e testing but did not
find any proper tooling support for e2e tests in raw cli apps. Hence, I opted
for unit testing instead. I chose Jest over Mocha and Chai for unit testing as
it had proper support for spies and mocks.

# Improvements that could be done

As the program is written without any frameworks, fewer toolings were available
for testing. Probably it should be ported to popular cli-apps frameworks such as
commander.js or ember-cli as it will have proper support for different kind of
tests and also it will help mantaining cli apps for the long term.
