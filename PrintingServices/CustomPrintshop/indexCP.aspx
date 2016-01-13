<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="indexCP.aspx.cs" Inherits="PrintingServices.CustomPrintshop.index" %>

<script src="CustomPrintshop/appCP.js"></script>
<link rel="stylesheet" href="CustomPrintshop/styleCP.css" />

<div class="container" id="cp">
    <h4>Custom Print Shop Request</h4>
    <div class="row error" id="cpError">
        ERROR:<br />
        Sorry, something went wrong. Please contact Technology for assistance.<br />
        Error message: 
    </div>
    <div id="confirmCP" title="Submit">
        This request will be submitted. Are you sure?
    </div>
    <div id="cpBody">
        <div class="row">
            <div class="col-xs-1"></div>
            <div class="col-xs-6">
                <label for="desc">Title of Job:</label>
                <input type="text" class="input sub" id="desc" name="desc" />
            </div>
            <div class="col-xs-4">
                <label for="toCP">Deliver To:</label>
                <input type="text" class="input sub" id="toCP" name="toCP" />
            </div>
            <div class="col-xs-1"></div>
        </div>
        <div class="row">
            <div class="col-xs-5 left">
                <label for="fulfill">Date Needed:</label>
                <input type="text" class="input sub" id="fulfill" name="fulfill" readonly="readonly" /><br />
                <!--<b>Note:  </b><b style="color:red;">Required value</b><br />-->
                 If needed sooner, call Print Shop, x7097.
            </div>
            <div class="col-xs-1"></div>
            <div class="col-xs-6">
                <label for="attach">Attachments:</label>
                <input type="file" id="attach" name="attach" multiple /><br />
                <b>Note:</b> Hold Ctrl while selecting files to select multiple attachments.<br />
                If Hard Copy originals, send to Printing Services with Job # on it.
            </div>
        </div>
        <div class="row">
            <div class="col-xs-5 left">
                <label for="keyCode">Key Code (Printer Code):</label>
                <input type="text" class="input sub" id="keyCodeCP" name="keyCode" />
            </div>
            <div class="col-xs-1">
                OR
            </div>
            <div class="col-xs-6 right">
                <label for="acctCode">Account Code:</label>
                <span id="acctCodeCP">
                    <input type="text" class="input sub acctCode acct4Digit" id="acctCode1CP" name="acctCode1" />
                    <input type="text" class="input sub acctCode acct2Digit" id="acctCode2CP" name="acctCode2" />
                    <input type="text" class="input sub acctCode acct4Digit" id="acctCode3CP" name="acctCode3" />
                    <input type="text" class="input sub acctCode acct3Digit" id="acctCode4CP" name="acctCode4" />
                    <input type="text" class="input sub acctCode acct4Digit" id="acctCode5CP" name="acctCode5" />
                    <input type="text" class="input sub acctCode acct4Digit" id="acctCode6CP" name="acctCode6" />
                </span>
            </div>
        </div>
        <b>Note:</b> Use Key Code = 99 for self-pay.
        <div class="row">
            <div class="col-xs-2"></div>
            <div class="col-xs-3">
                <label for="type">Type:</label>
                <select id="type" name="type">
                    <option value="black/white">Black/White</option>
                    <option value="color">Color</option>
                </select>
            </div>
            <div class="col-xs-2">
                <label for="numCP">Quantity:</label>
                <input class="spinner numCP" id="numCP" name="numCP" value="1" />
            </div>
            <div class="col-xs-3">
                <label for="sideCP">Sided:</label>
                <select id="sideCP" name="sideCP">
                    <option value="one sided">One Sided</option>
                    <option value="two sided">Two Sided</option>
                </select>
            </div>
            <div class="col-xs-2"></div>
        </div>
        <div class="row">
            <div class="col-xs-6">
                <label for="instruct">Instructions:</label><br />
                <textarea class="input" id="instruct" name="instruct" rows="6" cols="40"></textarea><br />
                <div id="instructError"><b>ALERT:</b> Maximum length of 65,535 characters exceeded.</div>
            </div>
            <div class="col-xs-6">
                <b>Example information to include in Instructions:</b><br />
                Paper: White, Color, 2-part NCR, etc.<br />
                Weight: 20#, Astrobright, Cardstock, etc.<br />
                Size: 8.5 x 11, 8.5 x 14, 11 x 17, etc.<br />
                Staple: Top left, 2 on side, Booklet, etc.<br />
                Fold: Letter, Single, Double, etc.<br />
                3-hole punch, Comb bind, Laminate, Pad, Cut, etc.<br />
            </div>
        </div>
        <div class="row">
            <button id="submitCP">Submit</button>
        </div>
    </div>
</div>