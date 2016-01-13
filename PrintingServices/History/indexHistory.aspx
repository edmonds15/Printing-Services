<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="indexHistory.aspx.cs" Inherits="PrintingServices.History.index" %>

<script src="History/appHistory.js"></script>
<link rel="stylesheet" href="History/styleHistory.css" />

<div class="container" id="history">
    <h4>History</h4>
    <div class="row error" id="historyError">
        ERROR:<br />
        Sorry, something went wrong. Please contact Technology for assistance.<br />
        Error message: 
    </div>
    <div id="historyBody">
        <div class="row">
            <div class="col-xs-2">
                <b>Request ID</b>
            </div>
            <div class="col-xs-2">
                <b>Date Received</b>
            </div>
            <div class="col-xs-3">
                <b>Job Description</b>
            </div>
            <div class="col-xs-2">
                <b>Job Status</b>
            </div>
            <div class="col-xs-3">
                <b>Date Completed</b>
            </div>
        </div>
        <div id="historyEntries"></div>
    </div>
</div>