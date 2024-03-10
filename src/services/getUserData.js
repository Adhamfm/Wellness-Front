import Cookies from "js-cookie"

export default async function getUserData() {
    try {
        const user = JSON.parse(Cookies.get('user'))
        const userLocal = JSON.parse(localStorage.getItem('user'))
        console.log(user)
        console.log(userLocal)
            // const { data } = await axios.get(`https://wellnesshub.onrender.com/api/v1/customer/65d249efb0caf340385285fb`,{headers: {"authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQyNDllZmIwY2FmMzQwMzg1Mjg1ZmIiLCJpYXQiOjE3MDk3MjczMzUsImV4cCI6MTcxMjMxOTMzNX0.Q81vIV297_QjIsZQhWxcGkwMEt1s_MtYB2ACPxVxi-M"}})
            // console.log(data)
    } catch (error) {
        console.log(error)
    }
}