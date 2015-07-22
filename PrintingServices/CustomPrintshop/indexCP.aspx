<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="indexCP.aspx.cs" Inherits="PrintingServices.CustomPrintshop.index" %>

<script src="CustomPrintshop/appCP.js"></script>
<link rel="stylesheet" href="CustomPrintshop/styleCP.css" />

<div class="container" id="cp">
    <h4>Custom Print Shop Request</h4>
    <div class="row">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" runat="server" disabled />
        <label for="date">Date:</label>
        <input type="text" id="date" name="date" runat="server" disabled />
    </div>
    <div class="row">
        <div class="col-xs-5" id="left">
            <label for="keyCode">Key Code:</label>
            <input type="text" id="keyCode" name="keyCode" />
        </div>
        <div class="col-xs-2">
            OR
        </div>
        <div class="col-xs-5" id="right">
            <label for="acctCode">Account Code:</label>
            <span id="acctCode">
                <input type="text" id="acctCode1" name="acctCode1" />
                <input type="text" id="acctCode2" name="acctCode2" />
                <input type="text" id="acctCode3" name="acctCode3" />
                <input type="text" id="acctCode4" name="acctCode4" />
                <input type="text" id="acctCode5" name="acctCode5" />
                <input type="text" id="acctCode6" name="acctCode6" />
            </span>
        </div>
    </div>
    <div class="row">
        <div class="col-xs-6">
            <label for="fulfill">Fulfill By Date:</label>
            <input type="text" id="fulfill" name="fulfill" />
        </div>
        <div class="col-xs-6">
            <label for="attach">Attachments:</label>
            <input type="file" id="attach" name="attach" multiple />
        </div>
    </div>
    <div class="row">
        <label for="instruct">Instructions:</label><br />
        <textarea id="instruct" name="instruct" rows="10" cols="40"></textarea>
    </div>
    <div class="row">
        <button id="submit">Submit</button>
    </div>
</div>
