<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="indexDF.aspx.cs" Inherits="PrintingServices.DistrictForms.index" %>

<script src="DistrictForms/appDF.js"></script>
<link rel="stylesheet" href="DistrictForms/styleDF.css" />

<div class="container" id="df">
    <h4>District Forms Request</h4>
    <div class="row">
        <button id="addRow">Add Form</button>
    </div>
    <div id="entries">
        <div class="entry">
            <label for="form">Select a form:</label>
            <select name="form">
                <option>Form Name</option>
            </select>
            <label for="loc">Select a location:</label>
            <select>
                <option>Location Name</option>
            </select>
            <label for="num">Quantity:</label>
            <input class="spinner" name="num" value="1"/>
            <label for="comment">Comments:</label>
            <input type="text" class="comment" name="comment" />
        </div>
    </div>
    <div class="row">
        <button id="submit">Submit</button>
    </div>
</div>