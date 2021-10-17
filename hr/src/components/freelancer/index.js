import { useEffect, useState } from 'react';
import axios from 'axios';
import './style.css'

function Freelancer(){
    const [isLoading, setLoading] = useState(true);
    const [freelancer, setFreelancer] = useState();
    const [attestation, setAttestation] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('https://stagiaire.herokuapp.com/api/freelancer/isFinish/1', {headers: {"Authorization": `Bearer ${token}`}})
        .then(res =>{
            setAttestation(res.data.data);
        })
        .catch(err => {console.log(err)})
        axios.get('https://stagiaire.herokuapp.com/api/freelancer/notActive', {headers: {"Authorization": `Bearer ${token}`}})
        .then(res =>{
            setFreelancer(res.data.data);
            setLoading(false);
        })
        .catch(err => {console.log(err)})
    }, []);

    function stagiaireActive(e){
        const token = localStorage.getItem('token');
        const url = "https://stagiaire.herokuapp.com/api/freelancer/active/" + e;
        console.log(url);

        axios.get(url, {headers: {"Authorization": `Bearer ${token}`}})
         .then(res =>{console.log(res);
            removeFreelancer(e);
        })
         .catch(err => {console.log(err)})
    }
    function attestationActive(e){
        console.log(attestation);
        // const token = localStorage.getItem('token');
        // const url = "https://stagiaire.herokuapp.com/api/stagiaire/attestation/" + e;
        // console.log(url);

        // axios.get(url, {headers: {"Authorization": `Bearer ${token}`}})
        //  .then(res =>{console.log(res);
        //         removeAttestation(e);
        // })
        //  .catch(err => {console.log(err)})
    }
    
    function removeAttestation(e){
        const id = Number(e);
        const newPeople = attestation.filter(function(item){
            return item.id !== id
        });
        setAttestation(newPeople);
    }
    function removeFreelancer(e){
        const id = Number(e);
        const newPeople = freelancer.filter(function(item){
            return item.id !== id
        });
        setFreelancer(newPeople);
    }


    if (isLoading) {
        return <div className="App">Loading...</div>;
    }
        var namesList = freelancer.map(function(name){
            return (<div key={name.id} className="stagiaireItem"><div className="operationTitle"><p>{name.Nom}</p><p>{name.Prenom}</p></div><div className="operationButton"><button value={name.id} onClick={({ target }) =>stagiaireActive(target.value)} className="active">Active</button><button className="remove">Remove</button></div></div>);
        })
        if (attestation){
        var namesList2 = attestation.map(function(name){
            return (<div key={name.id} className="stagiaireItem"><div className="operationTitle"><p>{name.Nom}</p><p>{name.Prenom}</p></div><div className="operationButton"><button value={name.id} onClick={({ target }) =>attestationActive(target.value)} className="active">Attestation</button></div></div>);
        })}


    return(
        <div className="stagiaireContainer">
            <div className="stagiaireHeader">
                <p>FREELANCER</p>
                <div className="stagiaireOperation">
                    <div>All</div>
                    <div>Refresh</div>
                </div>
            </div>
            <div className="stagiaireList">
                {namesList}
                {namesList2}
            </div>
            <div>
            </div>
        </div>
    )
}

export default Freelancer