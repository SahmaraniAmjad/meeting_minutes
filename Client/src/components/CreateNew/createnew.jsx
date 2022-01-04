import React, { Component } from "react";
const Createnew = () => {
  return (
    <div>
      <form class="container center_div border rounded ">
        <fieldset>
          <legend>Fill Meeting Details</legend>

          <div class="form-group w-50 p-3">
            <fieldset>
              <label class="control-label" for="readOnlyInput">
                Meeting ID
              </label>
              <input
                class="form-control"
                id="readOnlyInput"
                type="text"
                placeholder="M0001"
                readonly=""
              />
            </fieldset>
          </div>

          <div class="form-group w-50 p-3">
            <div class="col-xs-10">
              <label class="col-form-label" for="inputDefault">
                Team Lead
              </label>
              <input
                type="text"
                class="form-control"
                placeholder=""
                id="inputDefault"
              />
            </div>

            <label class="col-form-label" for="inputDefault">
              Date
            </label>
            <input
              type="Date"
              class="form-control"
              placeholder=""
              id="inputDefault"
            />

            <label class="col-form-label" for="inputDefault">
              Start Time
            </label>
            <input
              type="time"
              class="form-control"
              placeholder=""
              id="inputDefault"
            />

            <label class="col-form-label" for="inputDefault">
              End Time
            </label>
            <input
              type="time"
              class="form-control"
              placeholder=""
              id="inputDefault"
            />

            <label class="col-form-label" for="inputDefault">
              Status Until Now
            </label>
            <textarea
              class="form-control"
              rows="5"
              id="StatusUntilNow"
            ></textarea>

            <label class="col-form-label" for="inputDefault">
              Agenda
            </label>
            <textarea
              class="form-control"
              rows="5"
              id="inputDefault"
            ></textarea>

            <label class="col-form-label" for="inputDefault">
              What Next
            </label>
            <textarea class="form-control" rows="5" id="WhatNext"></textarea>
            <br />
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Createnew;
