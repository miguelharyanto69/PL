import dark from "../../assets/image/dark-bg.png";

const Footer = () => {
    return (
        <footer className="w-full py-12 px-20" style={{
            backgroundImage:`url(${dark})`,
            backgroundSize:'cover',
            backgroundPosition:'center',
            backgroundRepeat:'no-repeat'
        }}>
            <div className="flex items-start"></div>
        </footer>
    )
}

export default Footer;