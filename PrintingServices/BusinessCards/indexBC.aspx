<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="indexBC.aspx.cs" Inherits="PrintingServices.BusinessCards.index" %>

<script src="BusinessCards/appBC.js"></script>
<link rel="stylesheet" href="BusinessCards/styleBC.css" />

<div class="container" id="bc">
    <h4>Business Cards Request</h4>
    <div class="error" id="bcError">
        ERROR:<br />
        Sorry, something went wrong. Please contact for assistance.<br />
        Error message: 
    </div>
    <div id="bcBody">
        <div class="row" id="cardInfo">
            <div class="col-xs-6 left">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name"/><br />
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" /><br />
                <label for="email">Email:</label>
                <input type="text" id="email" name="email" /><br />
                <span id="phoneEntries">
                    <span class="phoneEntry">
                        <label for="phone">Phone:</label>
                        <select class="phoneType">
                            <option value="work">Work</option>
                            <option value="cell">Cell</option>
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
                <label for="num">Quantity (Box of 250):</label>
                <input class="spinner" name="num" value="1" />
            </div>
            <div class="col-xs-4">
                <label for="finish">Finish:</label>
                <select id="finish">
                    <option value="matte">Matte</option>
                    <option value="gloss">Gloss</option>
                </select>
            </div>
            <div class="col-xs-4">
                <b>Price: $0.00</b>
            </div>
        </div>
        <div class="row">
            <div class="col-xs-5 left">
                <label for="keyCode">Key Code:</label>
                <input type="text" class="input" id="keyCode" name="keyCode" />
            </div>
            <div class="col-xs-1">
                OR
            </div>
            <div class="col-xs-6 right">
                <label for="acctCode">Account Code:</label>
                <span id="acctGroup">
                    <input type="text" class="input acctCode acct4Digit" id="acctCode1" name="acctCode1" />
                    <input type="text" class="input acctCode acct2Digit" id="acctCode2" name="acctCode2" />
                    <input type="text" class="input acctCode acct4Digit" id="acctCode3" name="acctCode3" />
                    <input type="text" class="input acctCode acct3Digit" id="acctCode4" name="acctCode4" />
                    <input type="text" class="input acctCode acct4Digit" id="acctCode5" name="acctCode5" />
                    <input type="text" class="input acctCode acct4Digit" id="acctCode6" name="acctCode6" />
                </span>
            </div>
        </div>
        <div class="row">
            <button id="submitBC">Submit</button>
        </div>
    </div>
</div>