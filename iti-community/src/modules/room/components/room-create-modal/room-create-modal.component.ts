import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NzMessageService } from "ng-zorro-antd/message";
import { NgForm } from '@angular/forms';
import { RoomType } from '../../room.model';
import { RoomService } from '../../services/room.service';

export class CreateRoomFormModel {
  name: string = "";
  type: RoomType = RoomType.Text;
}

@Component({
  selector: 'app-room-create-modal',
  templateUrl: './room-create-modal.component.html',
  styleUrls: ['./room-create-modal.component.less']
})
export class RoomCreateModalComponent implements OnInit {
  @ViewChild("f")
  form: NgForm;

  isVisible: boolean = false;
  model = new CreateRoomFormModel();
  @Output() create = new EventEmitter<any>();

  constructor(private roomService: RoomService, private nzMessageService: NzMessageService) {

  }

  ngOnInit(): void {
  }

  async onOk() {
    if (this.form.form.valid) {
      this.roomService.create(this.model.name, this.model.type)
      this.create.emit()
      this.close();
    } else {
      this.nzMessageService.error("Veuillez remplir tous les champs");
    }
  }

  onCancel() {
    this.close();
  }

  open() {
    this.isVisible = true;
    setTimeout(() => this.form.resetForm(new CreateRoomFormModel()))
  }

  close() {
    this.isVisible = false;
  }
}
