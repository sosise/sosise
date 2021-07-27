const mailConfig = {
    /**
     * If set to true, fake emails would be sent
     * Use this option for development
     */
    dryrun: false,

    /**
     * SMTP configuration
     */
    smtp: {
        /**
         * Default configuration
         */
        host: process.env.MAILER_HOST,
        port: process.env.MAILER_PORT || 587,
        secure: false,
        auth: {
            user: process.env.MAILER_USERNAME,
            pass: process.env.MAILER_PASSWORD
        },
        tls: {
            ciphers: 'SSLv3'
        }

        /**
         * Gmail example SMTP configuration
         */
        // host: "smtp.gmail.com",
        // port: 587,
        // secure: false,
        // auth: {
        //     user: "example@gmail.com",
        //     pass: "yourpassword"
        // },
        // tls: {
        //     ciphers: 'SSLv3'
        // }

        /**
         * Mailgun example SMTP configuration
         * Please visit https://app.mailgun.com/app/sending/domains/%YOURDOMAIN%/credentials to generate SMTP user
         */
        // host: "smtp.mailgun.org",
        // port: 587,
        // secure: false,
        // auth: {
        //     user: "example@yourdomain.com",
        //     pass: "yourpassword"
        // },
        // tls: {
        //     ciphers: 'SSLv3'
        // }
    },
};

export default mailConfig;
