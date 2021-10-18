import {useState, useEffect} from 'react';
import { Redirect, useParams  } from "react-router";
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import axios from "axios";

import './style.css';

import logo from '../../images/logo.png';
import profileIcon from '../../images/icons/person.svg';
import entrepreneurIcon from '../../images/icons/entrepreneur.svg';
import stagiaireIcon from '../../images/icons/stagiaire.svg';
import freelancerIcon from '../../images/icons/freelancer.svg';

function EntrepreneurUpdate(){
    const {id} = useParams();
    const [isLoading, setLoading] = useState(true);
    const [isLoading2, setLoading2] = useState(true);
    const [user, setUser] = useState();
    const [entrepreneur, setEntrepreneur] = useState();

        const [formData, setFormData] = useState({
            Prenom: '',Nom: '',Email: '',CIN: '',TEL: '',Adresse: '',DateDeNaissance: '',LieuDeNaissance: '',
            Identifiant: '',DateDadhesion: '',ValableJusquau: '',Specialite: ''
        })


    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('https://stagiaire.herokuapp.com/api/auto-entrepreneur/show/' + id, {headers: {"Authorization": `Bearer ${token}`}})
        .then(res =>{
            console.log(res);
            setEntrepreneur(res.data);
            setLoading2(false);
        })
        .catch(err => {console.log(err)})
        axios.get('https://stagiaire.herokuapp.com/api/user', {headers: {"Authorization": `Bearer ${token}`}})
        .then(res =>{console.log(res);
            setUser(res.data);
            setLoading(false);
        })
        .catch(err => {console.log(err)})
    }, []);

    const history = useHistory();
    function handelUserNav(){
        let element = document.getElementById("userNav");
        if (element.style.display === "none")
            element.style.display="block";
        else
            element.style.display="none";
        
    }
    document.addEventListener("click", function(evt) {
        let flyoutEl = document.getElementById('user'),
          targetEl = evt.target; // clicked element      
        do {
          if(targetEl === flyoutEl) {
            // This is a click inside, does nothing, just return.
           console.log("click inside");
            return;
          }
          // Go up the DOM
          targetEl = targetEl.parentNode;
        } while (targetEl);
        // This is a click outside.
        if (document.getElementById("userNav") && document.getElementById("userNav").style.display === "block")
            document.getElementById("userNav").style.display = "none";
    });
    function hendleSubmit(e){
        e.preventDefault()
        if (formData.Prenom !== "")
            console.log("");
        const token = localStorage.getItem('token');
        axios.post('https://stagiaire.herokuapp.com/api/auto-entrepreneur/update/' + id, formData,{headers: {"Authorization": `Bearer ${token}`}})
        .then(res =>{
            console.log("hh");
            history.push("/Entrepreneur/" + id);
        })
        .catch(err => {console.log(err)})
    }


    const isLogged = localStorage.getItem('token');
    if (!isLogged || isLogged === undefined) {return (<Redirect to="/login" />)}
    
    if (isLoading || isLoading2) {return <div className="App">Loading...</div>;}

    return(
        <div className="box">
        <section>
            <div className="header">
                <div className="logo"><img src={logo} alt="teck-57-log"/></div>
                <div id="user" className="user">
                    <div id="userRole" onClick={handelUserNav} className="user-role"><span>{user.Role}</span></div>
                    <ul id="userNav" className="user-nav">
                        <li>Profile</li>
                        <Link to="../Setting">
                        <li>Setting</li></Link>
                        <li className="logout">logout</li>
                    </ul>
                </div>
            </div>
        </section>
        <div className="homeContainer">
            <div className="sideBar">
                <Link to="/"> <div><img src={profileIcon} alt="profileicon" /></div> </Link>
                <Link to="/Userlist">  <div><img src={profileIcon} alt="profileicon" /></div> </Link>
                <Link to="/Stagiairelist">  <div><img src={stagiaireIcon} alt="profileicon" /></div> </Link>
                <Link to="/Entrepreneurlist"> <div><img src={entrepreneurIcon} alt="profileicon" /></div> </Link>
                <Link to="/FreelancerList"><div><img src={freelancerIcon} alt="profileicon" /></div></Link>
            </div>
            <div className="dashborde">
                <div className="entrepreneurUpdateBox">
                    <div className="stageTitle">{entrepreneur.Nom} {entrepreneur.Prenom}</div>
                        <form onSubmit={hendleSubmit}>
                        <div className="entrepreneurUpdateForm">
                            <div className="entrepreneurUpdateSectionTitle"><p>LES INFORMATIONS PERSONNELLES</p></div>
                            <div className="entrepreneurUpdateFormSection">
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >Prenom</label>
                                    <input type="text" name="Prenom" placeholder={entrepreneur.Prenom}
                                           onChange={(e) => setFormData({...formData, Prenom: e.target.value})}
                                           value={formData.Prenom}></input>
                                </div>
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >Nom</label>
                                    <input type="text" name="Nom" placeholder={entrepreneur.Nom}
                                           onChange={(e) => setFormData({...formData, Nom: e.target.value})}
                                           value={formData.Nom}></input>
                                </div>
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >Email</label>
                                    <input type="email" name="Email" placeholder={entrepreneur.Email}
                                           onChange={(e) => setFormData({...formData, Email: e.target.value})}
                                           value={formData.Email}></input>
                                </div>
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >CIN</label>
                                    <input type="text" name="CIN" placeholder={entrepreneur.CIN}
                                           onChange={(e) => setFormData({...formData, CIN: e.target.value})}
                                           value={formData.CIN}></input>
                                </div>
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >TEL</label>
                                    <input type="text" name="TEL" placeholder={entrepreneur.TEL}
                                           onChange={(e) => setFormData({...formData, TEL: e.target.value})}
                                           value={formData.TEL}></input>
                                </div>
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >Adresse</label>
                                    <input type="text" name="Adresse" placeholder={entrepreneur.Adresse}
                                           onChange={(e) => setFormData({...formData, Adresse: e.target.value})}
                                           value={formData.Adresse}></input>
                                </div>
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >Date de naissance</label>
                                    <input type="text" name="DateDeNaissance" placeholder={entrepreneur.DateDeNaissance}
                                           onFocus={target => {target.target.type = "date"}} onBlur={target => {target.target.type = "text"}}
                                           onChange={(e) => setFormData({...formData, DateDeNaissance: e.target.value})}
                                           value={formData.DateDeNaissance}></input>
                                </div>
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >Lieu de naissance</label>
                                    <input type="text" name="LieuDeNaissance" placeholder={entrepreneur.LieuDeNaissance}
                                           onChange={(e) => setFormData({...formData, LieuDeNaissance: e.target.value})}
                                           value={formData.LieuDeNaissance}></input>
                                </div>
                            </div>
                            <div className="entrepreneurUpdateSectionTitle"><p>CARTE D'ENTREPRENEUR</p></div>
                            <div className="entrepreneurUpdateFormSection">
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >N°dinscription au reistre national</label>
                                    <input type="text" name="Identifiant" placeholder={entrepreneur.Identifiant}
                                           onChange={(e) => setFormData({...formData, Identifiant: e.target.value})}
                                           value={formData.Identifiant}></input>
                                </div>
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >Date D'adhesion</label>
                                    <input type="text" name="DateDadhesion" placeholder={entrepreneur.DateDadhesion}
                                           onFocus={target => {target.target.type = "date"}} onBlur={target => {target.target.type = "text"}}
                                           onChange={(e) => setFormData({...formData, DateDadhesion: e.target.value})}
                                           value={formData.DateDadhesion}></input>
                                </div>
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >Valable Jusqu'au</label>
                                    <input type="text" name="ValibleJusquau" placeholder={entrepreneur.ValableJusquau}
                                           onFocus={target => {target.target.type = "date"}} onBlur={target => {target.target.type = "text"}}
                                           onChange={(e) => setFormData({...formData, ValableJusquau: e.target.value})}
                                           value={formData.ValableJusquau}></input>
                                </div>
                                <div className="entrepreneurUpdateInputGroupe">
                                    <label >Specialite</label>
                                    <input type="text" name="Specialite" placeholder={entrepreneur.Specialite}
                                           onChange={(e) => setFormData({...formData, Specialite: e.target.value})}
                                           value={formData.Specialite}></input>
                                </div>
                            </div>
                            <div className="entrepreneurUpdateFormButoon">
                                <button type="submit">Active</button>
                               <Link to={"/Entrepreneur/" + entrepreneur.id}> <button id="enterpreneurButoonCancel">Cancel</button></Link>
                            </div>
                        </div>
                        </form>
                </div>
            </div>
        </div>
        </div>
    )
}

export default EntrepreneurUpdate