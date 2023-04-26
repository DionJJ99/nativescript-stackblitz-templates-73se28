import {observableModule , fileSystemModule } from "@nativescript/core"



function createViewModel() {
    const viewModel = observableModule.fromObject({
        petName: "",
        petClass: ["Cat", "Dog", "Fish", "Bird","Bandicoot"],
        selectedTypeIndex: 0,
        birthday: new Date(),
        summary: "",

        onSave: function () {
            const fileName = "pet-data.txt";
            const file = fileSystemModule.knownFolders.documents().getFile(fileName);
            const content = `Pet Name: ${this.petName}\nType: ${this.petClass[this.selectedTypeIndex]}\nBirthday: ${this.birthday.toDateString()}`;

            file.writeText(content)
                .then(() => {
                    this.summary = "This pet is now successfully classified!";
                })
                .catch((err) => {
                    this.summary = "Whoops that wasn't supposed to happen: " + err;
                });
        }
    });

    return viewModel;
}

function onLoaded(args) {
    const page = args.object;
    const viewModel = createViewModel();
    page.bindingContext = viewModel;
}

exports.onLoaded = onLoaded;


