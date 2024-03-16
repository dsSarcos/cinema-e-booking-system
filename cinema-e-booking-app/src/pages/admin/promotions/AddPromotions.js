import React, { useRef, useState } from 'react';
import './AddPromotions.css'
import emailjs from '@emailjs/browser';

export const AddPromotions = () => {
    const [promotionConfirmationMsg, setPromotionConfirmationMsg] = useState(false);
    const [newPromotion, setPromotion] = useState({
        Name: "",
        Code: "",
        Discount: "",
        StartDate: "",
        EndDate: ""
    });

    const handlePromotionChange = (event) => {
        setPromotion({ ...newPromotion, [event.target.name]: event.target.value });
    };

    const submit = (e) => {
        console.log(newPromotion.Code);
        sendEmail(e);
        e.preventDefault();
        console.log(newPromotion.Name);

        // comment out when testing ADD PROMOTION
        fetch('http://localhost:3000/api/promotions/add', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newPromotion)
        }).then(() => {
            console.log('New promotion was added.');
            setPromotion({
                Name: "",
                Code: "",
                Discount: "",
                StartDate: "",
                EndDate: ""
            })
        }).then(() => {
            promotionConfirmationHandler();
        })
    }

    const promotionConfirmationHandler = () => {
        if (promotionConfirmationMsg === true) {
            setPromotionConfirmationMsg(false);
        } else {
            setPromotionConfirmationMsg(true);
        }
    }

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_kdgdjjf', 'template_okvgvpm', form.current, '7E9K7TZjbQ4Pa2R3T')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <><div className="add-promotion-container">
            <h1>Add Promotions</h1>
            <form id="add-promotion-form" onSubmit={submit} ref={form}>
                <label>
                    <p>Promotion Name:</p>
                    <input type="name" name="Name" id="add-promotion-text-field" value={newPromotion.Name} onChange={handlePromotionChange} placeholder='Name...'/>
                </label>
                <label>
                    <p>Code:</p>
                    <input type="code" name="Code" id="add-promotion-text-field" value={newPromotion.Code} onChange={handlePromotionChange} placeholder='Code...'/>
                </label>
                <label>
                    <p>Percent Discount:</p>
                    <input type="discount" name="Discount" id="add-promotion-text-field" value={newPromotion.Discount} onChange={handlePromotionChange} placeholder='Discount...'/>
                </label>
                <label>
                    <p>Start Date:</p>
                    <input type="startDate" name="StartDate" id="add-promotion-text-field" placeholder="XX/XX/XX" value={newPromotion.StartDate} onChange={handlePromotionChange} />
                </label>
                <label>
                    <p>End Date:</p>
                    <input type="endDate" name="EndDate" id="add-promotion-text-field" placeholder="XX/XX/XX" value={newPromotion.EndDate} onChange={handlePromotionChange} />
                </label>
                <button type="submit" id="add-promotion-button">Submit</button>
            </form>
        </div>
        <div>
        {promotionConfirmationMsg && (
            <div id="prompt">
                <div className="panel-container" id="add-movie-confirmation">
                    <h2>Confirmation</h2>
                    <hr/>
                    <p>Promotion successfully added, and subscribed users have been notified.</p>
                    <button id="add-movie-button" onClick={promotionConfirmationHandler}>OK</button>
                </div>
            </div>
        )}
        </div></>
    )
}