<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="indexDF.aspx.cs" Inherits="PrintingServices.DistrictForms.index" %>

<script src="DistrictForms/appDF.js"></script>
<link rel="stylesheet" href="DistrictForms/styleDF.css" />

<div class="container" id="df">
    <h4>District Forms Request</h4>
    <div class="row error" id="dfError">
        ERROR:<br />
        Sorry, something went wrong. Please contact Technology for assistance.<br />
        Error message: 
    </div>
    <div id="confirmDF" title="Submit">
        This request will be submitted. Are you sure?
    </div>
    <div id="dfBody">
        <div class="row">
            <button id="addRowDF">Add Form</button>
            <button id="removeRowDF">Remove Form</button>
        </div>
        <div id="dfEntries">
            <div class="entryDF">
                <label for="form">Form:</label>
                <select class="formDF" name="form">
                    <option value="none">Form Name</option>
                </select>
                <label for="num">Quantity:</label>
                <input class="spinner numDF" name="num" value="1" />
                <label for="to">Deliver To:</label>
                <input type="text" class="toDF" name="to" />
                <label for="comment">Comments:</label>
                <input type="text" class="commentDF" name="comment" />
            </div>
        </div>
        <div class="row">
            <button id="submitDF">Submit</button>
        </div>
    </div>
</div>