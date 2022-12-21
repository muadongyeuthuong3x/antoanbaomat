import './headercss.css'
import Cookies from 'js-cookie'
const HeaderWeb = () => {
    const name = localStorage.getItem("name")
    const avatar = localStorage.getItem("avatar")


    return (
        <header className='header-css'>
            <h3 className="congty"> Music KMA </h3>
            <div className="ttuser">
                <img className="avatarheader" src={`http://localhost:5000/src/uploads/` + avatar} alt="imgerr" />
                <p className="nameuser">{name}   </p>

            </div>
        </header>
    )
}

export default HeaderWeb