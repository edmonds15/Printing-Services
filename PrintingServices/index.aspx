﻿<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="PrintingServices.index" %>

<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="description" content="Edmonds School District Printing Services allows you to request a print job to the ESD Print Shop" />
    <meta name="author" content="Jonathan Phippen" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Printing Services</title>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
    <script src="Plugins/ElementQueries.js"></script>
    <script src="Plugins/ResizeSensor.js"></script>
    <script src="app.js"></script>
    
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css" />
    <link rel="stylesheet" href="style.css" />
</head>
<body>
    <div id="main">
        <div class="container">
            <h2>Edmonds School District Printing Services</h2>
            <h3>Logged in as: <asp:Literal ID="name" runat="server" /></h3>
            <div class="row error" id="error" runat="server">
                ERROR:<br />
                Sorry, something went wrong. Please contact Technology for assistance.<br />
                Error message: <b><asp:Literal ID="errormsg" runat="server" /></b>
            </div>
            <div class="row" id="body" runat="server">
                <div id="tabs">
                    <ul>
                        <li><a href="Home/indexHome.aspx">Home</a></li>
                        <li><a href="BusinessCards/indexBC.aspx">Business Cards</a></li>
                        <li><a href="Letterhead/indexLetter.aspx">Letterhead</a></li>
                        <li><a href="CustomPrintshop/indexCP.aspx">Custom Print</a></li>
                        <li><a href="DistrictForms/indexDF.aspx">District Forms</a></li>
                        <li><a href="CatalogItem/indexCI.aspx">Catalog Item</a></li>
                        <li><a href="History/indexHistory.aspx">History</a></li>
                        <li><a href="Help/indexHelp.aspx">Help</a></li>
                    </ul>
                </div>
            </div>
            <div id="tab">
                <asp:Literal ID="tabNum" runat="server" />
            </div>
        </div>
    </div>
</body>
</html>