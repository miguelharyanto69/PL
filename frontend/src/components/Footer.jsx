import dark from "../assets/image/dark-bg.png";
import logo from "../assets/image/logo.png";

const Footer = () => {
    return (
        <footer className="w-full pt-12" style={{
            backgroundImage:`url(${dark})`,
            backgroundSize:'cover',
            backgroundPosition:'center',
            backgroundRepeat:'no-repeat'
        }}>
            <div className="flex  px-20 items-start justify-between">
                <div className="flex w-[400px] flex-col gap-y-3">
                    <img className="w-[150px]" src={logo} alt="logo"/>
                    <p className="text-gray-400 text-sm font-normal leading-5">
                    All content included in this work is the property of BioScoop and is protected by international copyright laws. Unauthorized use may result in severe civil and criminal penalties and will be prosecuted to the maximum extent possible under law.
                    </p>
                </div>
                <ul className="flex flex-col gap-y-4 font-medium text-gray-400 text-sm uppercase">
                    <li>showing</li>
                    <li>now coming</li>
                    <li>spotlight</li>
                    <li>coming soon</li>

                </ul>
                <ul className="flex flex-col gap-y-4 font-medium text-gray-400 text-sm uppercase">
                    <li>showing</li>
                    <li>now coming</li>
                    <li>spotlight</li>
                    <li>coming soon</li>

                </ul>
                <ul className="flex flex-col gap-y-4 font-medium text-gray-400 text-sm uppercase">
                    <p>Bioscop support :</p>
                    <p>Email : Bioscop@gmail.com</p>

                </ul>
            </div>
            <div className="text-center bg-orange-500  mt-12 py-2">
                <p className="text-sm text-white font-medium">© Copyright 2023 BioScoop. All Rights Reserved.</p>
            </div>
        </footer>
    )
}

export default Footer;