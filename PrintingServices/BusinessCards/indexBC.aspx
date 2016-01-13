<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="indexBC.aspx.cs" Inherits="PrintingServices.BusinessCards.index" %>

<script src="BusinessCards/appBC.js"></script>
<link rel="stylesheet" href="BusinessCards/styleBC.css" />

<div class="container" id="bc">
    <h4>Business Cards Request</h4>
    <div class="error" id="bcError">
        ERROR:<br />
        Sorry, something went wrong. Please contact Technology for assistance.<br />
        Error message: 
    </div>
    <div id="confirmBC" title="Submit">
        <b>Important Note:</b><br />
        A proof will be sent soon after request is received. Approval must be sent back before cards are printed.<br />
        <br />
        This request will be submitted. Are you sure?
    </div>
    <div id="bcBody">
        <div class="row" id="cardInfo">
            <div class="col-xs-6 left">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" /><br />
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" /><br />
                <label for="email">Email:</label>
                <input type="text" id="email" name="email" /><br />
                <span id="phoneEntries">
                    <span class="phoneEntry">
                        <label for="phone">Phone:</label>
                        <select class="phoneType">
                            <option value="work">Work</option>
                            <option value="fax">Fax</option>
                            <option value="cell">Cell</option>
                            <option value="addtl">Addt'l</option>
                        </select>
                        <input type="text" class="phoneNum" name="phone" /><br />
                    </span>
                </span>
                <button id="addPhone">Add Phone</button>
                <button id="removePhone">Remove Phone</button>
            </div>
            <img src="Pictures/Business Card.png" alt="Sample Business Card"/>
        </div>
        <div class="row">
            <div class="col-xs-4">
                <label for="numBC">Quantity (Box of 250):</label>
                <input class="spinner" id="numBC" name="numBC" value="1" />
            </div>
            <div class="col-xs-2">
                <label for="finish">Finish:</label>
                <select class="priceChange" id="finish">
                    <option value="matte">Matte</option>
                    <option value="gloss">Gloss</option>
                </select>
            </div>
            <div class="col-xs-3">
                <span id="sideControl">
                    <label for="side">Sided:</label>
                    <select class="priceChange" id="side">
                        <option value="single">Single Sided</option>
                        <option value="double">Double Sided</option>
                    </select>
                </span>
            </div>
            <div class="col-xs-3 right" id="price">
                <b>Price: $13.00</b>
            </div>
        </div>
        <b>Note:</b> Contact Print Shop (x7097) for any special requests (add $10).
        <div class="row">
            <div class="col-xs-5 left">
                <label for="keyCode">Key Code (Printer Code):</label>
                <input type="text" id="keyCodeBC" name="keyCode" />
            </div>
            <div class="col-xs-1">
                OR
            </div>
            <div class="col-xs-6 right">
                <label for="acctGroup">Account Code:</label>
                <span id="acctGroup">
                    <input type="text" class="acctCode acct4Digit" id="acctCode1BC" name="acctCode1" />
                    <input type="text" class="acctCode acct2Digit" id="acctCode2BC" name="acctCode2" />
                    <input type="text" class="acctCode acct4Digit" id="acctCode3BC" name="acctCode3" />
                    <input type="text" class="acctCode acct3Digit" id="acctCode4BC" name="acctCode4" />
                    <input type="text" class="acctCode acct4Digit" id="acctCode5BC" name="acctCode5" />
                    <input type="text" class="acctCode acct4Digit" id="acctCode6BC" name="acctCode6" />
                </span>
            </div>
        </div>
        <b>Note:</b> Use Key Code = 99 for self-pay
        <div class="row">
            <label for="toBC">Deliver To:</label>
            <input type="text" id="toBC" name="toBC" />
            <label for="commentsBC">Comments:</label>
            <input type="text" id="commentsBC" name="commentsBC" />
        </div>
        <div class="row">
            <button id="submitBC">Submit</button>
        </div>
    </div>
</div>