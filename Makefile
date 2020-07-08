all:
	DISPLAY=:0 google-chrome --pack-extension=Source --pack-extension-key=CancelCancelCulture.pem --user-data-dir=/tmp/foooo
	mv Source.crx CancelCancelCulture.crx
key:	
	openssl genrsa -out privkey.pem 4096
	openssl pkcs8 -topk8 -nocrypt -in privkey.pem -out CancelCancelCulture.pem
