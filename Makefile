all:
	[ -x `which grunt` ] || npm install -g grunt
	[ -x `which jekyll` ] || gem install jekyll
	npm install
	rm -f .git/hooks/pre-commit
	ln -s ../../hooks/pre-commit .git/hooks/pre-commit
	grunt default

server: all
	grunt connect watch
