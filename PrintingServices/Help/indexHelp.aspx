<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="indexHelp.aspx.cs" Inherits="PrintingServices.Help.index" %>

<script src="Help/appHelp.js"></script>
<link rel="stylesheet" href="Help/styleHelp.css" />

<div class="container" id="help">
    <h4>Help</h4>
    <div class="section">
        <b>District Forms Request</b><br />
        Here you can request standard district forms to be printed and sent.<br />
        Just select the form name and your location code, along with the quantity and any comments, and submit.<br />
        The form name and quantity are required fields, while the comments an deliver to box are optional.<br />
        You can also add multiple requests using the "Add Form" button, and remove them with the "Remove Form" button.<br />
        Submitting will automatically process and log each request in our database.
    </div>
    <div class="section">
        <b>Business Cards Request</b><br />
        Here you can create a business card design to be printed.<br />
        Enter the required Name, Title, Email, and Phone, and key/account code, as well as selecting the Quantity and Finish, and submit.<br />
        The Deliver To and Comments fields are optional.
    </div>
    <div class="section">
        <b>Custom Print Shop Request</b><br />
        Here you can request custom jobs to be printed.<br />
        Type a description, select a required by day and any attachments, your key code or account code, and instructions, then submit.<br />
        The description, key/account code, and instructions are required fields, and the required by day and attachments are optional.<br />
        <b>Note:</b> You can select multiple attachments in one request by holding the "Ctrl" key while selecting files.<br />
        <b>Note:</b> Uploading attachments is not supported in Internet Explorer version 9 or below. Upgrade <a href="http://windows.microsoft.com/en-us/internet-explorer/download-ie">here</a>, or use a different browser.
    </div>
    <div class="section">
        <b>Request History</b><br />
        Here you can view all requests in our database that you've made previously.<br />
        The page will display the last 10 requests, with a forward/back page if you have more than 10.
    </div>
    <div class="section">
        <b>Other</b><br />
        If you need any other assistance, contact Information Systems in the Technology department. Thank you.<br />
        Written by Jonathan Phippen, on behalf of Edmonds School District, Summer 2015.
    </div>
</div>