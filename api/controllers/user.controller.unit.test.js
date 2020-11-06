import userController from './user.controller'
import userService from '../services/user.services'

const users = [{
    _id: '1234',
    userName: 'farhah',
    __v: 0
},]

const mockUser = {
    userName: "farhah",
    userId: "1234",
};

describe("Create or update a user", () => {
    beforeAll(() => {
        // User.findOneAndUpdate = jest.spyOn(User, 'findOneAndUpdate').mockResolvedValue(users)
        userService.createUser = jest.fn().mockResolvedValueOnce(users)
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    it("Should create or update a user successfully", () => {
        userService.createUser = jest.fn().mockResolvedValueOnce(users)
        const result = userController.saveUser(mockUser.userName, mockUser.userId)
        expect(result).resolves.toEqual(users)
    });

    it("Should return error when params are null", async () => {
        expect( async () => await userController.saveUser('', '').catch(e => expect(e).toEqual('Error while creating user => userName is undefined')))
        
    });

    it("Should return error when one of the params is null", async() => {
        // jest.spyOn(userService, "createUser").mockRejectedValue(Promise.reject);
        // expect(userController.saveUser('farhah', '')).rejects.toEqual(Promise.reject)
        expect( async () => await userController.saveUser('farhah', '').catch(e => expect(e).toEqual('Error while creating user => userId is undefined')))

    });

});


describe("Search a user", () => {

    beforeAll(() => {
        // User.findOneAndUpdate = jest.spyOn(User, 'findOneAndUpdate').mockResolvedValue(users)
        userService.createUser = jest.fn().mockResolvedValueOnce(users)
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    it("Should return a user", () => {
        expect(userController.getUser(mockUser.userId)).resolves.toEqual(users[0])
    })
})
