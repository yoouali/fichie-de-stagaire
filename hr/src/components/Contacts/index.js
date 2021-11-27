import outgoingCall from '../../images/icons/outgoingcall.png';


function Contacts(){
    return(
    <div className="contactsList">
        <div className="contactsListItem">
            <div className="contactsListItemOperation">
                <div id="contactListOperationEdit" className="contactsListItemOperationEdit">...</div>
                <div id="contactListOperationDelete" className="contactsListItemOperationRemove">&#10007;</div>
            </div>
            <div className="contactsListItemName"><p>&#128100;</p>Youssef Ouali</div>
            <div className="contactsListItemNumber"><p>&#128241;</p>0777672016</div>
            <div className="contactsListItemDetails">
                <div className="contactsListItemDetailsCalls"><p>&#128222;</p> 20</div>
                <div className="contactsListItemDetailsTime"><p>&#128336;</p>15.20 min</div>
            </div>
        </div>
    </div>
    )
}

export default Contacts