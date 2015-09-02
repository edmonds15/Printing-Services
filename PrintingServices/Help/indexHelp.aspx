<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="indexHelp.aspx.cs" Inherits="PrintingServices.Help.index" %>

<script src="Help/appHelp.js"></script>
<link rel="stylesheet" href="Help/styleHelp.css" />

<div class="container" id="help">
    <h4>Help</h4>
    <div class="section">
        <h5>District Forms Request</h5>
        Here you can request standard district forms to be printed and sent.<br />
        Just select the form name and your location code, along with the quantity and any comments, and hit submit.<br />
        The form name, location, and quantity are required fields, while the comments box is optional.<br />
        You can also add multiple requests using the "Add Form" button, and remove them with the "Remove Form" button.<br />
        Submitting will automatically process and log each request in our database.
    </div>
    <div class="section">
        <h5>Business Cards Request</h5>
        Coming soon!
    </div>
    <div class="section">
        <h5>Custom Print Shop Request</h5>
        Here you can request custom jobs to be printed.<br />
        Type a description, select a required by day and any attachments, your key code or account code, and instructions, then submit.<br />
        The description and key code/account code are required fields, and the required by day, attachments, and instructions are optional.<br />
        <b>Note:</b> You can select multiple attachments in one job by holding the "Ctrl" key while selecting files.<br />
        <b>Note:</b> Uploading attachments is not supported in Internet Explorer version 9 or below. Upgrade <a href="http://windows.microsoft.com/en-us/internet-explorer/download-ie">here</a>, or use a different browser.
    </div>
    <div class="section">
        <h5>Request History</h5>
        Here you can view all requests in our database that you've made previously.<br />
        The page will display the last 10 requests, with a forward/back page if you have more than 10.<br />
    </div>
    <div class="section">
        <h5>Other</h5>
        If you need any other assistance, contact Information Systems in the Technology department. Thank you.<br />
        Written by Jonathan Phippen, on behalf of Edmonds School District, Summer 2015.
    </div>
</div>