require("dotenv").config();

const ADMIN_CREDENTIALS = () => {
    return {
        email: process.env.ADMIN_EMAIL,
        password: "123456",
        name: "Tresor Matonde",
        profession: "Contracter",
        telephone: "+942 411 412",
        mobileNumber: "+942 411 412",
        expertiseFeild: "Contracter",
        town: "USA",
        fax: 0900,
        about: "A US based professional.",
        role: "admin",
        profile: "",
    }
}
module.exports = {
    ADMIN_CREDENTIALS,
};