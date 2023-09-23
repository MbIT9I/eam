<template>
        <v-card class="mt-5">
            <v-card-title class="pa-0 ma-0">
                <p class="text-h5 text-white pa-2">
                    {{ $t('support-request') }}
                </p>
            </v-card-title>
            <v-card-actions class="pt-2">
                <v-form :disabled="loading" class="w-100">
                    <v-row>
                        <v-col cols="12" md="4">
                            <v-text-field ref="name"
                                v-model="name" aria-required="true"
                                :rules="nameRules"
                                :label="$t('name')"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field ref="phone"
                                v-model="phone"
                                :rules="phoneRules"
                                :label="$t('phone')"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="4">
                            <v-text-field ref="position"
                                v-model="position"
                                :rules="positionRules"
                                :label="$t('position')"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea ref="message"
                                v-model="message"
                                :rules="messageRules"
                                :label="$t('message')"
                                required
                            ></v-textarea>
                        </v-col>
                        <v-col cols="6">
                            <v-btn
                                color="primary"
                                @click="submit"
                            >{{ $t('submit') }}</v-btn>
                        </v-col>
                        <v-col cols="6">
                            <v-btn
                                color="secondary"
                                @click="selectFilesAndPost"
                            >{{ $t('add-files') }}</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-actions>
        </v-card>
</template>

<script>
import gql from 'graphql-tag'

export default {
    props: {
        equipmentCode: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            name: '',
            nameRules: [
                v => !!v || this.$t('name-is-required'),
            ],
            phone: '',
            phoneRules: [
                v => !!v || this.$t('phone-is-required'),
                v => /^\+?[0-9]{10,}$/.test(v) || this.$t('phone-must-be-valid'),
            ],
            position: '',
            positionRules: [
            ],
            message: '',
            messageRules: [
                v => !!v || this.$t('message-is-required'),
            ],
            uploadedFiles: [],
            loading: false
        }
    },
    methods: {
        async submit() {
            let requestId = await this.$apollo.mutate({
                // Query
                mutation: gql`mutation serviceRequest ($args: CreateWorkRequestParams) {_eamservicemut {addServiceRequest(args: $args)}}`,
                // Parameters
                variables: {
                    args: {
                        content: this.message,
                        equipmentId: this.equipmentCode,
                        phone: this.phone,
                        position: this.position,
                        responsible: this.name
                    }
                },
                update: data => data._eamservicemut.addServiceRequest,
            })

            console.log(requestId)
        },
        selectFilesAndPost() {
            let that = this
            this.loading = true
            var finishLoading = function() {
                that.loading = false
                console.log(that.uploadedFiles)
            }
            var postFile = function(file) {
                let formData = new FormData();
                formData.append('files', file, file.name);
                return fetch('https://erp.harwind.com.ua/ws/AddFile.ashx', {
                    method: 'POST',
                    body: formData
                }).then(async response => {
                    if (response.ok) {
                        let reader = response.body.getReader();
                        let x = (await reader.read())
                        let id = new TextDecoder().decode(x.value)
                        that.uploadedFiles.push({ id, name: file.name });
                    } else {
                        throw new Error(this.$t('something-went-wrong'), response.status, response.statusText);
                    }
                }).catch(error => {
                    console.error(error);
                })
            }

            //try request open file dialog
            let input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            input.click();
            //get selected files
            input.onchange = async e => {
                let files = e.target.files;
                //create form data
                for (let i = 0; i < files.length; i++) {
                    let file = files[i];
                    await postFile(file)
                }
                finishLoading()
            }
        }
    }
}
</script>

<style scoped lang="scss">
.v-card-title {
  background-color: rgba(var(--v-theme-secondary-darken-1));
  .text-h5 {
      text-transform: uppercase !important;
  }
}
</style>