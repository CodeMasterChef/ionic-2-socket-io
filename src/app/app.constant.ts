export const AppConstant = {
    API_ENDPOINT: "http://10.88.14.15:8080/wordpress/api/v1/",
    // API_ENDPOINT:  "http://10.88.17.199/ivision/api/v1/" },
    LOCAL_STORAGE_CHECKLOGIN: "check_login",
    LOCAL_STORAGE_TOKEN: "login_token",
    LOCAL_STORAGE_USERNAME: "username",
    LOCAL_STORAGE_USERID: "userid",
    LOCAL_STORAGE_USERAVATAR: "useravatar",
    LOCAL_STORAGE_USERFIRSTNAME: "firstname",
    LOCAL_STORAGE_USERLASTNAME: "lastname",
    LOCAL_STORAGE_USEREMAIL: "email",
    ITEM_FEED_PER_PAGE: 10,
    ITEM_GROUP_MEMBER_PER_PAGE: 10,
    ITEM_ALL_GROUP_PER_PAGE: 20,
    ITEM_MY_GROUP_PER_PAGE: 20,
    TARGET_WIDTH_OF_IMAGE_UPLOAD_GROUP: 200,
    TARGET_HEIGHT_OF_IMAGE_UPLOAD_GROUP: 200,
}

export const AppRegex = {
    EMAIL_REGEX: /^(([^<>\[\]\\.,,:\s@']+(\.[^<>\[\]\\.,,:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/,
}
