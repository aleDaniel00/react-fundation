const roles = [{
	id: 1,
	name: 'admin',
}, {
	id: 2,
	name: 'common',
}];

module.exports = class RoleRepository {
	findByUserId(id) {
		return roles.find(role => role.id === id);
	}
}