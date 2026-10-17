import MemberModel from "../schema/Member.model";
import { LoginInput, Member, MemberInput, MemberUpdateInput } from "../libs/types/member";
import Errors, { HttpCode, Message } from "../libs/Errors";
import { MemberType } from "../libs/enums/member.enum";
import * as bcrypt from "bcryptjs";
import { shapeIntoMongooseObjectId } from "../libs/types/config";

class MemberService {
  private readonly memberModel = MemberModel;

  /** SPA */

  public async signup(input: MemberInput): Promise<Member> {
    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result.toObject() as unknown as Member;
    } catch (err) {
      console.log("Error, model:signup", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.USED_NICK_PHONE);
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    // TODO: Consider member status later
    return this.authenticate(input);
  }

  /** SSR */

  public async processSignup(input: MemberInput): Promise<Member> {
    const exist = await this.memberModel
      .findOne({ memberType: MemberType.RESTAURANT })
      .exec();
    if (exist) throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);

    const salt = await bcrypt.genSalt();
    input.memberPassword = await bcrypt.hash(input.memberPassword, salt);

    try {
      const result = await this.memberModel.create(input);
      result.memberPassword = "";
      return result.toObject() as unknown as Member;
    } catch (err) {
      console.log("Error, model:processSignup", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  public async processLogin(input: LoginInput): Promise<Member> {
    return this.authenticate(input);
  }

  /** Shared login logic */

  private async authenticate(input: LoginInput): Promise<Member> {
    const member = await this.memberModel
      .findOne(
        { memberNick: input.memberNick },
        { memberNick: 1, memberPassword: 1 }
      )
      .exec();

    if (!member) {
      throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
    }

    const isMatch = await bcrypt.compare(
      input.memberPassword,
      member.memberPassword
    );
    if (!isMatch) {
      throw new Errors(HttpCode.UNAUTHORIZED, Message.WRONG_PASSWORD);
    }

    const result = await this.memberModel.findById(member._id).lean().exec();
    if (!result) {
      throw new Errors(HttpCode.NOT_FOUND, Message.NO_MEMBER_NICK);
    }

    return result as unknown as Member;
  }

  public async getUsers(): Promise<Member[]> {
  const result = await this.memberModel
    .find({ memberType: MemberType.USER })
    .exec();
  if (!result) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
  return result as unknown as Member[];
}

public async updateChosenUser(input: MemberUpdateInput): Promise<Member> {
  const memberId = shapeIntoMongooseObjectId(input._id);
  const result = await this.memberModel
    .findByIdAndUpdate(memberId, input, { new: true })
    .exec();
  if (!result) throw new Errors(HttpCode.NOT_MODIFIED, Message.UPDATED_FAILED);
  return result as unknown as Member;
}

// function shapeIntoMongooseObjectId(_id: Schema.Types.ObjectId): Types.ObjectId {
//   return new Types.ObjectId(_id.toString());
// }
}

export default MemberService;
