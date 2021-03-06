import {Component, Inject, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatCheckboxChange} from '@angular/material';

import {ClientSettings, Monitor} from '../lib/rat_lite';

@Component({selector : 'monitors-towatch', templateUrl : './monitorstowatch.component.html'})
export class MonitorsToWatchComponent implements OnInit {
    @Input() f: FormArray;
    @Input() MonitorsToWatch: Monitor[];
    @Input() Monitors: Monitor[];
    warningtext = null;
    constructor(private fb: FormBuilder) {}
    public ngOnInit(): void
    {
        this.MonitorsToWatch.forEach((a: Monitor) => { this.f.push(new FormControl(a.Id)); });
    }
    public isChecked(mon: Monitor): boolean
    {
        var found = this.f.controls.find((a: AbstractControl) => { return a.value == mon.Id; });
        if (found) {
            return true;
        }
        else {
            return false;
        }
    }
    public checked(changedevent: MatCheckboxChange, mon: Monitor): void
    {
        this.warningtext = null;
        if (changedevent.checked) {
            var found = this.f.controls.findIndex((a: AbstractControl) => { return a.value == mon.Id; });
            if (found == -1) {
                this.f.push(new FormControl(mon.Id));
                this.f.setErrors(null);
            }
        }
        else {
            var found = this.f.controls.findIndex((a: AbstractControl) => { return a.value == mon.Id; });
            if (found != -1) {
                this.f.removeAt(found);
            }
            if (this.f.controls.length ==0) {
                this.warningtext = "You must have at least one monitor selected!";
                this.f.setErrors({onemonitorneeded : true});
            }
            else {
                this.f.setErrors(null);
            }
        }
    }
}