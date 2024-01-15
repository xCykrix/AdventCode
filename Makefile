################################
# Project Configuration Makefile
#
# setup
# - Initialize the project for development.
# - Calls './dev/setup.sh'.
#
################################

setup:
	@echo "Task: 'setup'"
	@mkdir -p "dev"
	@touch ./dev/setup.sh
	@chmod +x ./dev/setup.sh
	sh ./dev/setup.sh
