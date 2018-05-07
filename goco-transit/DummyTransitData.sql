USE [CCT]
GO

/* Delete all entries */
DELETE FROM [dbo].[Transit_Rides] WHERE 1=1
GO
DELETE FROM [dbo].[Transit_Rides] WHERE 1=1
GO

/* Insert dummy data into Rides table */
INSERT INTO [dbo].[Transit_Rides]
    ([transaction_datetime]
    ,[driver_username]
	,[max_capacity]
    ,[origin]
    ,[destination]
    ,[departure_datetime]
    ,[driver_note])
VALUES /* WARNING: Do not create more than 1 dummy ride with the same driver_username, since the next section treats it as a primary key. */
	(GETDATE(), 'nathan.gray', 3, 'Gordon', 'Boston', '2018-05-11 14:30:00.000', 'Visiting the city for the day'),
	(GETDATE(), 'zach.brown', 4, 'Nottingham', 'Gordon', '2018-05-13 20:15:00.000', 'Willing to take I-93 or I-95'),
	(GETDATE(), 'bradley.boutcher', 2, 'Gordon', 'Danvers', '2018-05-09 18:30:00.000', 'Going to senior formal and have extra space'),
	(GETDATE(), 'davis.modarelli', 5, 'Gordon', 'Boston', '2018-05-11 10:45:00.000', 'You have to buy a yearbook to ride with me'),
	(GETDATE(), 'samuel.solberg', 2, 'Hamilton', 'Pittsburgh', '2018-05-12 09:05:00.000', NULL);
GO

/* Insert dummy data into Requests table */
INSERT INTO [dbo].[Transit_Requests]
    ([transaction_datetime]
    ,[requester_username]
    ,[ride_id]
    ,[requester_note]
    ,[is_confirmed])
VALUES
    (GETDATE(), 'zach.brown', (SELECT [ride_id] FROM [dbo].[Transit_Rides] WHERE driver_username = 'nathan.gray'), 'Looking for a ride back as well.', 0),
	(GETDATE(), 'samuel.colacchia', (SELECT [ride_id] FROM [dbo].[Transit_Rides] WHERE driver_username = 'nathan.gray'), NULL, 1),
	(GETDATE(), 'matthew.felgate', (SELECT [ride_id] FROM [dbo].[Transit_Rides] WHERE driver_username = 'nathan.gray'), 'Can we stop at Starbucks?', 1),
	(GETDATE(), 'spencer.lindsay', (SELECT [ride_id] FROM [dbo].[Transit_Rides] WHERE driver_username = 'zach.brown'), '95 is easier for me', 0),
	(GETDATE(), 'hailey.moore', (SELECT [ride_id] FROM [dbo].[Transit_Rides] WHERE driver_username = 'zach.brown'), 'I live right off of 93', 0),
	(GETDATE(), 'will.deacon', (SELECT [ride_id] FROM [dbo].[Transit_Rides] WHERE driver_username = 'zach.brown'), NULL, 1);
GO

/* Display resulting tables */
SELECT * FROM [dbo].[Transit_Rides]
GO
SELECT * FROM [dbo].[Transit_Requests]
GO