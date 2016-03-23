
module.exports = function() {

    return {
        /**
         * @param  {array} array to sort by
         * @param  {array} second array to sort based on first array
         * @param {string} key key in first array to sort by
         * @return {array} array of 2 elements, containing both arrays
         */
        simultSort: function(A, B, key) {
            var all = [];

            for (var i = 0; i < B.length; i++) {
                all.push({ 'A': A[i], 'B': B[i] });
            }

            all.sort(function(a, b) {
                return a.A[key] - b.A[key];
            });

            A = [];
            B = [];

            for (var i = 0; i < all.length; i++) {
               A.push(all[i].A);
               B.push(all[i].B);
            }    

            return [A, B];
        }     

    }
}