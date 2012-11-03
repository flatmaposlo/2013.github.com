all:
	[ -x `which grunt` ] || npm install -g grunt
	npm install
	rm -f .git/hooks/pre-commit
	ln -s ../../hooks/pre-commit .git/hooks/pre-commit
	grunt default

server: all
	grunt server watch
