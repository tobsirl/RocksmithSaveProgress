//=====================================================================
// Config file
//=====================================================================

module.exports = {  

// Secret key for JWT signing and encryption
'secret': 'super secret passphrase',
// Database connection information
'database': 'mongodb://toby:99633426@ds157809.mlab.com:57809/rs_saveprogress',
// Port for server
'port': process.env.PORT || 8000
//'host': process.env.HOST || 'localhost';

}