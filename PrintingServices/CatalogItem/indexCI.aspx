<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="indexCI.aspx.cs" Inherits="PrintingServices.CatalogItem.indexCI" %>

<script src="CatalogItem/appCI.js"></script>
<link rel="stylesheet" href="CatalogItem/styleCI.css" />

<div class="container" id="ci">
    <h4>Catalog Item Request</h4>
    <div class="row error" id="ciError">
        ERROR:<br />
        Sorry, something went wrong. Please contact Technology for assistance.<br />
        Error message: 
    </div>
    <div id="confirmCI" title="Submit">
        This request will be submitted. Are you sure?
    </div>
    <div id="ciBody">
        <div class="row">
            <button id="addRowCI">Add Item</button>
            <button id="removeRowCI">Remove Item</button>
        </div>
        <div id="ciEntries">
            <div class="entryCI">
                <label for="item">Item:</label>
                <select class="input itemCI" name="item">
                    <option value="none">Item Name</option>
                </select>
                <label for="num">Quantity:</label>
                <input class="spinner numCI" name="num" value="1" />
                <label for="to">Deliver To:</label>
                <input type="text" class="toCI" name="to" />
                <label for="comment">Comments:</label>
                <input type="text" class="commentCI" name="comment" />
            </div>
        </div>
        <div class="row">
            <div class="col-xs-5 left">
                <label for="keyCode">Key Code (Printer Code):</label>
                <input type="text" class="input sub" id="keyCodeCI" name="keyCode" />
            </div>
            <div class="col-xs-1">
                OR
            </div>
            <div class="col-xs-6 right">
                <label for="acctCode">Account Code:</label>
                <span id="acctCodeCI">
                    <input type="text" class="input sub acctCode acct4Digit" id="acctCode1CI" name="acctCode1" />
                    <input type="text" class="input sub acctCode acct2Digit" id="acctCode2CI" name="acctCode2" />
                    <input type="text" class="input sub acctCode acct4Digit" id="acctCode3CI" name="acctCode3" />
                    <input type="text" class="input sub acctCode acct3Digit" id="acctCode4CI" name="acctCode4" />
                    <input type="text" class="input sub acctCode acct4Digit" id="acctCode5CI" name="acctCode5" />
                    <input type="text" class="input sub acctCode acct4Digit" id="acctCode6CI" name="acctCode6" />
                </span>
            </div>
        </div>
        <div class="row">
            <button id="submitCI">Submit</button>
        </div>
    </div>
</div>