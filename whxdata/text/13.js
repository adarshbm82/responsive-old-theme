rh._.exports({"0":["Updating the system to a new version"],"1":["\n  ","\n  ","Updating your system to a new release (whether it is your personal WiFi router or a powerful PortaSwitch® server, serving tens of thousands of customers) is always a challenging task. You ask yourself questions such as: How long will it take? Will updates\n    be applied correctly to all system components involved? What happens if something goes wrong – can I get my system back to the operational state it is in now, etc.?","\n  ","PortaSwitch® utilizes an innovative system of maintaining and modifying the software code on each server, allowing you to properly address all of the concerns expressed above and ensure that you are able to:","\n  ","\n    ","\n      ","Migrate quickly to a new maintenance release, without any problems on the way and obtain the system that operates 100% according to how it is intended to operate.","\n    ","\n    ","\n      ","In case there is something wrong with the functionality of the new release (e.g. you just realized that in order to properly use the new feature you need to train all of your staff, and this would take several days) you can safely rollback to exactly\n        the same version of the software you were using prior to the update.","\n    ","\n  ","\n  ","Most of the software systems currently used throughout the world contain a single copy of the “current” software so that when an update is done – some parts of it would be replaced with updated versions. This brings up a significant risk of incompatibility\n    between the updated components – and the ones that remain from before the update may render the whole system unstable.","\n  ","An alternative approach – when the entire code image is replaced with a new version (this is how you update the firmware in your router, for instance), poses the risk that if something goes wrong during the update process – the system ends up without\n    any operable software and becomes totally unusable (my guess is that you probably heard about the iPhones which “brick” after an update?).","\n  ","This is why PortaSwitch® utilizes a dual software version management system that has none of the weaknesses described above.","\n  ","The disk subsystem on each PortaSwitch® server contains three (3) separate partitions. One of them is used to store the actual application data, i.e. database files, logs and .csv files with statistics of the customer’s activity, etc. Two (2) other\n    partitions are equal in size and each of them can contain the full set of the software “code” required to operate the server – operating system, third-party libraries and modules (e.g. Apache) and the actual code for a specific application, e.g. PortaSIP®.\n    At any given moment one of these partitions is considered active: this means that upon startup, the server uses this particular partition to boot up and the application code, located within it, is used to operate the service. When the system is being\n    prepared for an update to a new release, the other partition is cleared and the new version of the code is installed there. This is done while the system is still operating under the current version of the software, without any service interruption.\n    Now the server has all the required data to operate with the new release – moreover, since the new release is installed as a set of binary packages, one can be sure that this is exactly the same code (the same version of operating system, the same\n    version of kernel and the same bytes in every single utility or file!) that was used in PortaOne’s labs during the testing period, that was deployed on staging systems during the field testing and that is currently being used by other PortaOne customers\n    worldwide.","\n  ","After that, the configuration agent updates the “local” files (e.g. “etc/hosts”) based on the system’s configuration stored in the Configuration server: e.g. what IP address each service is working on and which application-specific features are on and/or\n    off, etc.","\n  ","Finally, at the specific time the new partition is marked as “active” the server is restarted using the new version of the code (these tasks are done automatically by the update agent, controlled by the Configuration server). The potential downtime\n    is just a few minutes – the time required to complete the restart. Nothing is changed in the “old” partition though – so if a rollback is required, it only requires a reboot from that partition and the server is back to the old, “stable” release.","\n  "," ","\n  ","\n  "," ","\n  ","After some time when you wish to update to an even newer release, this partition is wiped clean and the new version of the code is loaded into the recently emptied location. Then the process described above repeats.","\n  ","The same process is used to update to a new maintenance release or to a newer software build within the current release.","\n  ","\n  ","If all PortaSwitch® applications were “stateless”, in other words, if they were only doing some calculations based on the current input from the user and some pre-programmed rules – this chapter would end with the previous paragraph.","\n  ","Actually, most of the applications in the real world, and PortaSwitch® is one of them, rely on a large set of previously accumulated data to make decisions about how the service should be provided. For instance, if the customer has already made calls\n    to the US & Canada for a total of 101 minutes during this billing period, and his plan only allows for 100 free minutes – a call made right now would be charged at $0.05/min rate.","\n  ","All the data accumulated by the old software release are available to the new one after the upgrade to ensure the system’s proper operation – and this involves changing the data files, database structures and data to accommodate the new release.","\n  ","So the update process includes two extra steps:","\n  ","\n    ","\n      ","Non-blocking data modifications are done as part of the “preparation” process, when the new release is already installed to the new partition, but before it becomes active. These modifications include adding new tables, inserting new records, etc.\n        – basically anything that could be done while the system continues to operate with the old release.","\n    ","\n    ","\n      ","Blocking data modifications that may affect the system’s performance while they are carried out. For example, adding a column to a table in MySQL prevents all other queries to that table from being executed until the operation is complete (another\n        advantage offered by PortaBilling® with Oracle Real Application Cluster is that there are almost no “blocking” operations there). Blocking updates are done during off-peak periods.","\n        "," Needless to say, the PortaOne team tries to reduce the number of blocking data structure modifications and the amount of time required to apply them. We do it by using the following techniques:","\n      ","\n        ","\n          ","Zero downtime update technology. During the update of the main site, the secondary site processes the load.","\n        ","\n        ","\n          ","PortaBillling® with Oracle Real Application Cluster allows Oracle online table redefinition to be used if there is no secondary site.","\n        ","\n        ","\n          ","Dual Version. This is a PortaOne solution that allows gradually migrating the subscribers from an older release to a newer one.","\n        ","\n      ","\n    ","\n  ","\n  ","The process described above allows the data modifications to be performed while the system still operates using the current release. There is one important consideration, though: during that time, the “older” version of the release operates with the\n    “newer” version of the data. (The same situation would happen if you were to rollback to the older release).","\n  ","The PortaOne team has a development and testing process specifically aimed to make this possible, but we can only guarantee this inter-operability for the adjoining releases. In other words, the system operating with MR39 will operate normally while\n    the data is being updated to MR40 (or it is possible to rollback to MR39 after the migration to MR40 has been done). It is not possible to provide this transparency when the distance between releases is too great (e.g. MR36 will most likely ","not ","operate\n    properly if the data has already been updated to the MR39 format). Thus, the preferred method of updating that provides unlimited time for update preparation and allows for fallback to the previously used version is to go step by step: e.g. from MR39\n    to MR40, then from MR40 to MR41 and finally from MR41 to MR42, etc. (If required, it is still possible to do a MR36 to MR39 update in one go, of course – but in this case there is no possibility of performing a rollback).","\n\n"],"2":["Updating the application data"],"3":["Updating the system to a new version"],"id":"13"})