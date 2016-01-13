<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="indexLetter.aspx.cs" Inherits="PrintingServices.Letterhead.indexLetter" %>

<script src="Letterhead/appLetter.js"></script>
<link rel="stylesheet" href="Letterhead/styleLetter.css" />

<div class="container" id="letter">
    <h4>Letterhead Request</h4>
    <div class="error" id="letterError">
        ERROR:<br />
        Sorry, something went wrong. Please contact Technology for assistance.<br />
        Error message: 
    </div>
    <div id="confirmLetter" title="Submit">
        This request will be submitted. Are you sure?
    </div>
    <div id="letterBody">
        <div class="row">
            <label for="school">School Name:</label>
            <select id="schoolLetter" name="school">
                <option value="none">School Name</option>
            </select>
            <label for="address">Address:</label>
            <input type="text" id="addressLetter" name="address" />
            <label for="phone">Phone:</label>
            <input type="text" id="phoneLetter" name="letter" />
            <label for="fax">Fax:</label>
            <input type="text" id="faxLetter" name="fax" />
        </div>
        <div class="row">
            <b>Names:</b><br />
            <div id="letterEntries">
                <div class="entryLetter">
                    <label for="name">Name:</label>
                    <input type="text" class="input nameLetter" name="name" />
                    <label for="title">Title:</label>
                    <input type="text" class="input titleLetter" name="title" />
                </div>
            </div>
            <button id="addNameLetter">Add Name</button>
            <button id="removeNameLetter">Remove Name</button>
        </div>
        <div class="row">
            <div class="col-xs-5 left">
                <label for="keyCode">Key Code (Printer Code):</label>
                <input type="text" class="input sub" id="keyCodeLetter" name="keyCode" />
            </div>
            <div class="col-xs-1">
                OR
            </div>
            <div class="col-xs-6 right">
                <label for="acctCode">Account Code:</label>
                <span id="acctCodeLetter">
                    <input type="text" class="input sub acctCode acct4Digit" id="acctCode1Letter" name="acctCode1" />
                    <input type="text" class="input sub acctCode acct2Digit" id="acctCode2Letter" name="acctCode2" />
                    <input type="text" class="input sub acctCode acct4Digit" id="acctCode3Letter" name="acctCode3" />
                    <input type="text" class="input sub acctCode acct3Digit" id="acctCode4Letter" name="acctCode4" />
                    <input type="text" class="input sub acctCode acct4Digit" id="acctCode5Letter" name="acctCode5" />
                    <input type="text" class="input sub acctCode acct4Digit" id="acctCode6Letter" name="acctCode6" />
                </span>
            </div>
        </div>
        <div class="row">
            <button id="submitLetter">Submit</button>
        </div>
    </div>
</div>