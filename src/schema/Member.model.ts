import mopngoose, {Schema} from "mongoose";
import { MemberStatus, memberType } from "../libs/types/enums/member.enum";

const memberSchema = new Schema ({
  memberType: {
    type: String,
    enum: memberType,
    default: memberType.USER,
  },

  MemberStatus: {
    type: String,
    enum:MemberStatus,
    default: MemberStatus.ACTIVE,
  },

  memberNick: {
    type:String,
    index:{unique: true,sparse:true},
    required: true,
  },

  memberPhone: {
    type:String,
    index:{unique: true, sparse: true},
    required:true
  },

  memberPassword: {
    type:String,
    select: false,
    required: true,
  },

  memberAddress: {
    type: String,
  },

  memberDesc: {
    type: String,
  },

  memberImage: {
    type:String,
  },

  memberPoints: {
    type:Number,
    default: 0,
  },
},
{timestamps: true} // updatedAt,createdAt
);

export default mongoose.model("Member", memberSchema);