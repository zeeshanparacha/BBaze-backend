require("dotenv").config();

const ADMIN_CREDENTIALS = () => {
    return {
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        name: "Trésor M. Matondo",
        profession: "Videographer",
        mobileNumber: "704 312 0524",
        expertiseFeild: "Media",
        town: "Maryland",
        role: "admin",
        fax: "",
        about: "",
        profile: "",
        telephone: "",
    }
}
module.exports = {
    ADMIN_CREDENTIALS,
};