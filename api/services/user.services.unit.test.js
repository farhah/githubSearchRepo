import userService from './user.services'
import UserModel from '../models/UserModel'

const users = [{
    _id: '1234',
    userName: 'farhah',
    __v: 0
},]


describe("Create a user", () => {
    beforeAll(() => {
        // User.findOneAndUpdate = jest.spyOn(User, 'findOneAndUpdate').mockResolvedValue(users)
        UserModel.findOneAndUpdate = jest.fn().mockResolvedValueOnce(users)
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("Should create a new user successfully", () => {

        const mockUser = {
            userName: "farhah",
            userId: "1234",
        };
        expect(userService.createUser(mockUser.userName, mockUser.userId)).resolves.toEqual(users)
        // userService.createUser(mockUser.userName, mockUser.userId);
        // const spyCreatedUser = spy;
        // console.log(spyCreatedUser)
        // expect(spy).toHaveBeenCalledTimes(1);
        // expect(spyCreatedUser.userName).toEqual(mockUser.userName);
        // expect(spyCreatedUser.userId).toEqual(mockUser.userId);
    });

    it("Should return an error when userName is missing", () => {
        expect.assertions(1);
        return userService.createUser('', '1234').catch(e => expect(e).toEqual('Error while creating user => userName is undefined'))
    });

    it("Should return an error when userId is missing", () => {
        // jest.spyOn(userService, "createUser").mockRejectedValue(Promise.reject());
        // expect( await userService.createUser('farhah', '')).rejects.toThrow(Promise.reject)
        expect.assertions(1);
        return userService.createUser('farhah', '').catch(e => expect(e).toEqual('Error while creating user => userId is undefined'))
    });
})


describe("Get a user", () => {

    beforeAll(() => {
        // User.findOneAndUpdate = jest.spyOn(User, 'findOneAndUpdate').mockResolvedValue(users)
        UserModel.find = jest.fn().mockResolvedValueOnce(users)
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("Should return 1 user", () => {
        expect(userService.getUser('123')).resolves.toEqual(users)
    })
})
  