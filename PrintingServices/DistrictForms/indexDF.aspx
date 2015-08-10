<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="indexDF.aspx.cs" Inherits="PrintingServices.DistrictForms.index" %>

<script src="DistrictForms/appDF.js"></script>
<link rel="stylesheet" href="DistrictForms/styleDF.css" />

<div class="container" id="df">
    <h4>District Forms Request</h4>
    <div class="row">
        <button id="addRow">Add Form</button>
        <button id="removeRow">Remove Form</button>
    </div>
    <div id="entries">
        <div class="entry">
            <label for="form">Form:</label>
            <select class="form" name="form">
                <option value="none">Form Name</option>
            </select>
            <label for="loc">Location:</label>
            <select class="loc" name="loc">
                <option value="none">Location Name</option>
            </select>
            <label for="num">Quantity:</label>
            <input class="spinner" name="num" value="1" />
            <label for="comment">Comments:</label>
            <input type="text" class="comment" name="comment" />
        </div>
    </div>
    <div class="row">
        <button id="submitDF">Submit</button>
    </div>
</div>