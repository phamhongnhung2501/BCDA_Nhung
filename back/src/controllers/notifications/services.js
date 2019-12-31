const { Notification } = require('./models/notification');

const response = require('../base/response');
const serializer = require('../base/serializer');

const listNotification = async (req, res) => {
	try {
		// filter
		let filter_object = createFilterObject(req);
		// query filter
		let notifications = await Notification.find(filter_object).sort('-created_date')
		let notifications_full = [];
		for (let notification of notifications) {
			let notification_full = await serializer.convertOutput(notification);
			notifications_full.push(notification_full);
		}
		// result object with total document queried
		let result = {
			object: notifications_full,
			total: notifications_full.length
		}
		return response.ok(res, result);
	} catch (error) {
		console.log(error);
		
		response.internal(res, error);
	}

};

const setAsRead = async (req, res) => {
	try {
		let notifications = await Notification.find({ user_id: req.user._id, read: null });
		for (let notification of notifications) {
			notification.read = Date.now();
			await notification.save();
		}
		return response.noContent(res);
	} catch (error) {
		response.internal(res, error);
	}
};

const setAsReadById = async (req, res) => {
	try {
		let notification = await Notification.findById(req.params['notificationId']);
		if (!notification) return response.notFound(res, `Invalid Notification Id`);
		await notification.update({read: Date.now()});
		return response.ok(res);
	} catch (error) {
		response.internal(res, error);
	}
};

function createFilterObject(request) {
	if (request.query.only_unread === 'true')
		return {user_id: request.user.id, read: null}
	else if (request.query.only_unread === 'false') return {user_id: request.user.id, read: {$ne: null}}
	else return {user_id: request.user.id};
}

async function createNotifications(userCreate, userGetNotificationId) {
	let notification_data = {
		event_type: 'upgrade_to_admin',
		user_id: userGetNotificationId,
		data: {
			"user": {
				"id": userCreate._id,
				"full_name": userCreate.full_name,
				"photo": userCreate.photo,
				"email": userCreate.email,
				"date_joined": userCreate.create_date,
			},
		}
	};
	
	return await Notification.create(notification_data);
};

module.exports = {
	listNotification,
	setAsRead,
	setAsReadById,
	createNotifications,
};
