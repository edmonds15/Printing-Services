<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="indexCP.aspx.cs" Inherits="PrintingServices.CustomPrintshop.index" %>

<script src="CustomPrintshop/appCP.js"></script>
<link rel="stylesheet" href="CustomPrintshop/styleCP.css" />

<div class="container" id="cp">
    <h4>Custom Print Shop Request</h4>
    <div class="row error" id="cpError">
        ERROR:<br />
        Sorry, something went wrong. Please contact for assistance.<br />
        Error message: 
    </div>
    <div id="cpBody">
        <div class="row">
            <label for="desc">Title:</label>
            <input type="text" class="input" id="desc" name="desc" />
        </div>
        <div class="row">
            <div class="col-xs-5 left">
                <label for="fulfill">Date Needed:</label>
                <input type="text" class="input" id="fulfill" name="fulfill" />
            </div>
            <div class="col-xs-1"></div>
            <div class="col-xs-6">
                <label for="attach">Attachments:</label>
                <input type="file" id="attach" name="attach" multiple /><br />
                <b>Note:</b> Hold Ctrl while selecting files to select multiple attachments.
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
            <label for="instruct">Instructions:</label><br />
            <textarea class="input" id="instruct" name="instruct" rows="10" cols="40"></textarea>
        </div>
        <div class="row">
            <button id="submitCP">Submit</button>
        </div>
    </div>
</div>
