#Stop following command execution if command before failed
set -e

#Remove previous bucket if exists
delete_previous_version_if_exists() {
  #We either delete local folder and bucket object or just a bucket
  rm -r ./import &&
  gsutil -m rm -r gs://mspr-epsi-coffee-firestore-export/export ||
  gsutil -m rm -r gs://mspr-epsi-coffee-firestore-export/export
}

export_production_firebase_to_emulator() {
  #Export production firebase to emulator bucket
  gcloud firestore export gs://mspr-epsi-coffee-firestore-export/export

  #Copy to local folder
  gsutil -m cp -r gs://mspr-epsi-coffee-firestore-export/export .

  #Rename folder to import
  mv export import
}

#Run bash functions, either delete previous bucket and local folder if exists for update or just export clean way
delete_previous_version_if_exists && export_production_firebase_to_emulator ||
export_production_firebase_to_emulator