import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { AppConstant } from './app.constant';
import { ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as PouchDB from 'pouchdb';

@Injectable()

export class API {
    headers: Headers;
    options: RequestOptions;
    constructor(private http: Http) {

    }
    getHeader() {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        let session = localStorage.getItem(AppConstant.LOCAL_STORAGE_TOKEN);
        if (session != null && session != 'undefined') {
            this.headers.append('X-Authorization', 'Bearer ' + session);
        }
        this.options = new RequestOptions({ headers: this.headers });

    }
    uploadHeader() {
        this.headers = new Headers();
        let session = localStorage.getItem(AppConstant.LOCAL_STORAGE_TOKEN);
        if (session != null && session != 'undefined') {
            this.headers.append('X-Authorization', 'Bearer ' + session);
        }
        this.options = new RequestOptions({ headers: this.headers });
    }
    postUpload(model: any, url: string, callback, failer) {
        let formData = new FormData();
        for (let key in model) {
            if (key == "media_file") {
                if (model['data_type'] === 'video') {
                    formData.append(key, model[key], "video.mov");
                } else {
                    formData.append(key, model[key], "image.jpg");
                }
            } else {
                formData.append(key, model[key]);
            }
        }
        this.uploadHeader();
        return this.http.post(AppConstant.API_ENDPOINT + url, formData, this.options)
            .map((res: any) => {
                return res;
            })
            .subscribe(data => {
                callback(data._body);
            },
            err => {
                failer(err)
            },
            () => { }
            );
    }
    post(model: any, url: string, callback, failer) {
        this.getHeader();
        return this.http.post(AppConstant.API_ENDPOINT + url, model, this.options)
            .map((res: any) => {
                return res;
            })
            .subscribe(data => {
                callback(JSON.parse(data._body));
            },
            err => {
                failer(err)
            },
            () => { }
            );
    }
    get(url: string, callback, failer) {
        this.getHeader();
        return this.http.get(AppConstant.API_ENDPOINT + url, this.options)
            .map((res: any) => {
                return res;
            })
            .subscribe(data => {
                callback(JSON.parse(data._body));
            },
            err => {
                failer(err)
            }
            );
    }
    put(model: any, url: string, callback, failer) {
        this.getHeader();
        return this.http.put(AppConstant.API_ENDPOINT + url, this.options)
            .map((res: any) => {
                return res;
            })
            .subscribe(data => {
                callback(data)
            },
            err => {
                failer(err)
            },
            () => console.log('put done')
            );
    }
    delete(model: any, url: string, callback, failer) {
        this.getHeader();
        return this.http.delete(AppConstant.API_ENDPOINT + url + "?id=" + model.id, this.options)
            .map((res: any) => {
                return res;
            })
            .subscribe(data => {
                callback(JSON.parse(data._body));
            },
            err => {
                failer(err);
            });
    }
}

/**
 *  Create notification message for application. Wrapper ToastController 
 */
@Injectable()
export class ToastNotification {

    constructor(private toastCtrl: ToastController) {
    }

    /**
     * Display a success message
     */
    public success(message) {
        let toast = this.toastCtrl.create({
            message: message,
            position: 'top',
            duration: 2000,
            cssClass: 'toast-success'
        });
        toast.present();
    }

    /**
     * Display an error message 
     */
    public error(message) {
        let toast = this.toastCtrl.create({
            message: message,
            position: 'top',
            duration: 3000,
            showCloseButton: true,
            closeButtonText: 'X',
            cssClass: 'toast-error'
        });
        toast.present();
    }
}

/**
 * Http helper, wrap http angular to inject needed header
 */
@Injectable()
export class HttpHelper {

    _headers: Headers;
    _options: RequestOptions;
    _token: string;

    constructor(private _http: Http) {
        // get token from localStorage
        this._headers = new Headers();
        this._headers.append('X-Authorization', 'Bearer ' + this._token);
        this._headers.append('Content-Type', 'application/json');
        this._options = new RequestOptions({
            headers: this._headers
        });
    }

    /**
     * Add token to http request
     * @param {
     *   @type  token   string  {token}     Token which get from login endpoint
     * }
     * @return void
     */
    setToken(token) {

        this._options.headers.set('X-Authorization', 'Bearer ' + token);
    }

    /**
     * Remove Content-Type from Header 
     */
    clearContentType() {
        this._options.headers.delete('Content-Type');
    }

    /**
     * Post data to service endpoint
     * @param {
     *      @type   string  {url}           Absolute path url of API endpoint 
     *      @type   object  {data}          Content data post to service
     * }
     * @return Observable<Response>
     */
    post(url, data): Observable<Response> {
        return this._http.post(AppConstant.API_ENDPOINT + url, data, this._options);
    }

    /**
     * Post data to service endpoint, content include file
     * @param {
     *      @type   string  {url}           Absolute path url of API endpoint 
     *      @type   object  {data}          Content data post to service
     * }
     * @return Observable<Response>
     */
    postUpload(url, data) {
        let formData = new FormData();
        for (let key in data) {
            if (key == "media_file") {
                if (data['data_type'] === 'video') {
                    formData.append(key, data[key], "video.mov");
                } else {
                    formData.append(key, data[key], "image.jpg");
                }
            } else {
                formData.append(key, data[key]);
            }
        }

        // set header 
        let headers = new Headers();
        let token = localStorage.getItem(AppConstant.LOCAL_STORAGE_TOKEN);
        if (token != null && token != 'undefined') {
            headers.append('X-Authorization', 'Bearer ' + token);
        }
        let options = new RequestOptions({ headers: headers });

        return this._http.post(AppConstant.API_ENDPOINT + url, formData, options);
    }

    /**
     * Put data to service endpoint
     * @param {
     *      @type   string  {url}           Absolute path url of API endpoint 
     *      @type   object  {data}          Content data put to service
     * }
     * @return Observable<Response>
     */
    put(url, data): Observable<Response> {
        return this._http.put(AppConstant.API_ENDPOINT + url, data, this._options);
    }

    /**
     * Delete data to service endpoint
     * @param {
     *      @type   string  {url}           Absolute path url of API endpoint 
     * }
     * @return Observable<Response>
     */
    delete(url, id): Observable<Response> {
        return this._http.delete(AppConstant.API_ENDPOINT + url + "?id=" + id, this._options);
    }

    /**
     * Get data from service endpoint
     * @param {
     *      @type   string  {url}           Absolute path url of API endpoint
     * }
     * @return Observable<Response>
     */
    get(url): Observable<Response> {
        return this._http.get(AppConstant.API_ENDPOINT + url, this._options);
    }
}

/**
 * Base clas for all services
 */
@Injectable()
export class BaseService {

    /**
     * Parse error from response
     * @param {
     *   @type   Response   err  Error get from http  
     * }
     * @return   Array      Array error message
     */
    parseError(err) {
        let body = JSON.parse(err._body);
        return body.errors.err;
    }
}

/**
 * Object to share all data across application
 */
export class AppShareValue {

}

@Injectable()
export class DatabaseService {
    private database;
    private models;

    initDatabase() {
        this.database = new PouchDB('weather', { adapter: 'websql' });
    }
    add(model) {
        return this.database.post(model);
    }
    update(model) {
        return this.database.put(model);
    }
    delete(model) {
        return this.database.remove(model);
    }
    getAll() {

        if (!this.models) {
            return this.database.allDocs({ include_docs: true })
                .then(docs => {

                    // Each row has a .doc object and we just want to send an 
                    // array of model objects back to the calling controller,
                    // so let's map the array to contain just the .doc objects.

                    this.models = docs.rows.map(row => {
                        // Dates are not automatically converted from a string.
                        row.doc.Date = new Date(row.doc.Date);
                        return row.doc;
                    });

                    // Listen for changes on the database.
                    this.database.changes({ live: true, since: 'now', include_docs: true })
                        .on('change', this.onDatabaseChange);

                    return this.models;
                });
        } else {
            // Return cached data as a promise
            return Promise.resolve(this.models);
        }
    }
    private onDatabaseChange = (change) => {
        var index = this.findIndex(this.models, change.id);
        var model = this.models[index];

        if (change.deleted) {
            if (model) {
                this.models.splice(index, 1); // delete
            }
        } else {
            change.doc.Date = new Date(change.doc.Date);
            if (model && model._id === change.id) {
                this.models[index] = change.doc; // update
            } else {
                this.models.splice(index, 0, change.doc) // insert
            }
        }
    }

    // Binary search, the array is by default sorted by _id.
    private findIndex(array, id) {
        var low = 0, high = array.length, mid;
        while (low < high) {
            mid = (low + high) >>> 1;
            array[mid]._id < id ? low = mid + 1 : high = mid
        }
        return low;
    }
}

@Injectable()
export class NetworkService {
     private static isConnected : boolean = true;
     setIsConnected(status){
        NetworkService.isConnected = status;
     }
     getIsConnected() {
         return NetworkService.isConnected;
     }

}